package main

import (
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"net/http"
	"os"
	"strings"
	"sync/atomic"
)

var requestId atomic.Int32

func createProxyHandlerToGreenApi(
	greenApiBaseUrl string,
) echo.HandlerFunc {
	return func(c echo.Context) error {
		id := requestId.Add(1)

		greenApiUrl := fmt.Sprintf(
			"%s%s",
			greenApiBaseUrl,
			strings.Replace(c.Request().URL.Path, "/proxy/", "/", 1),
		)

		log.Debug(fmt.Sprintf("proxy request (%d) to url %s", id, greenApiUrl))

		var greenResp *http.Response
		var err error

		if c.Request().Method == http.MethodGet {
			greenResp, err = http.Get(greenApiUrl)
		} else if c.Request().Method == http.MethodPost {
			greenResp, err = http.Post(greenApiUrl, c.Request().Header.Get("Content-Type"), c.Request().Body)
		} else {
			log.Debug(fmt.Sprintf("proxy request (%d): unknown method", id))
			return c.String(http.StatusBadRequest, "unknown method")
		}

		if err != nil {
			log.Debug(fmt.Errorf("proxy request (%d): failed: %w", id, err))
			return c.String(http.StatusInternalServerError, "request to remote service failed")
		}

		if greenResp.StatusCode != http.StatusOK {
			log.Debug(fmt.Errorf("proxy request (%d): failed: status=%d(%s)", id, greenResp.StatusCode, greenResp.Status))
			return c.String(greenResp.StatusCode, "request to remote service failed")
		}

		defer func() {
			_ = greenResp.Body.Close()
		}()

		log.Debug(fmt.Sprintf("proxy request (%d): ok, connecting stream", id))
		return c.Stream(http.StatusOK, greenResp.Header.Get("Content-Type"), greenResp.Body)
	}
}

func main() {
	staticRoot := os.Getenv("STATIC_ROOT")
	if staticRoot == "" {
		staticRoot = "/static"
	}

	greenApiUrl := os.Getenv("GREEN_API_URL")
	if greenApiUrl == "" {
		panic("environment var GREEN_API_URL not set")
	}

	if os.Getenv("DEBUG_LOG") != "" {
		log.SetLevel(log.DEBUG)
	} else {
		log.SetLevel(log.ERROR)
	}
	log.SetHeader("${time_rfc3339}")

	e := echo.New()
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogURI:    true,
		LogStatus: true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			log.Debug(fmt.Sprintf("request url=%s status=%d", v.URI, v.Status))
			return nil
		},
	}))
	e.Static("/", staticRoot)

	proxy := createProxyHandlerToGreenApi(greenApiUrl)
	e.GET("/proxy/*", proxy)
	e.POST("/proxy/*", proxy)

	err := e.Start(":8080")
	if err != nil {
		panic(err)
	}
}
