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

const OwnStatusInternalServerError = 599

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

		greenReq, err := http.NewRequestWithContext(
			c.Request().Context(),
			c.Request().Method,
			greenApiUrl,
			c.Request().Body,
		)
		if err != nil {
			log.Debug(fmt.Errorf("proxy request (%d): prepare error: %w", id, err))
			return c.String(OwnStatusInternalServerError, "request to remote service prepare error")
		}
		greenReq.Header.Set("Content-Type", c.Request().Header.Get("Content-Type"))

		greenResp, err := http.DefaultClient.Do(greenReq)
		if err != nil {
			log.Debug(fmt.Errorf("proxy request (%d): failed: %w", id, err))
			return c.String(OwnStatusInternalServerError, "request to remote service failed")
		}

		defer func() {
			_ = greenResp.Body.Close()
		}()

		log.Debug(fmt.Sprintf("proxy request (%d): ok, connecting stream", id))
		return c.Stream(greenResp.StatusCode, greenResp.Header.Get("Content-Type"), greenResp.Body)
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
