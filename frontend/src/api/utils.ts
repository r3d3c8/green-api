
const StatusContinue           = 100 // RFC 9110, 15.2.1
const StatusSwitchingProtocols = 101 // RFC 9110, 15.2.2
const StatusProcessing         = 102 // RFC 2518, 10.1
const StatusEarlyHints         = 103 // RFC 8297

const StatusOK                   = 200 // RFC 9110, 15.3.1
const StatusCreated              = 201 // RFC 9110, 15.3.2
const StatusAccepted             = 202 // RFC 9110, 15.3.3
const StatusNonAuthoritativeInfo = 203 // RFC 9110, 15.3.4
const StatusNoContent            = 204 // RFC 9110, 15.3.5
const StatusResetContent         = 205 // RFC 9110, 15.3.6
const StatusPartialContent       = 206 // RFC 9110, 15.3.7
const StatusMultiStatus          = 207 // RFC 4918, 11.1
const StatusAlreadyReported      = 208 // RFC 5842, 7.1
const StatusIMUsed               = 226 // RFC 3229, 10.4.1

const StatusMultipleChoices   = 300 // RFC 9110, 15.4.1
const StatusMovedPermanently  = 301 // RFC 9110, 15.4.2
const StatusFound             = 302 // RFC 9110, 15.4.3
const StatusSeeOther          = 303 // RFC 9110, 15.4.4
const StatusNotModified       = 304 // RFC 9110, 15.4.5
const StatusUseProxy          = 305 // RFC 9110, 15.4.6
//_                       = 306 // RFC 9110, 15.4.7 (Unused)
const StatusTemporaryRedirect = 307 // RFC 9110, 15.4.8
const StatusPermanentRedirect = 308 // RFC 9110, 15.4.9

const StatusBadRequest                   = 400 // RFC 9110, 15.5.1
const StatusUnauthorized                 = 401 // RFC 9110, 15.5.2
const StatusPaymentRequired              = 402 // RFC 9110, 15.5.3
const StatusForbidden                    = 403 // RFC 9110, 15.5.4
const StatusNotFound                     = 404 // RFC 9110, 15.5.5
const StatusMethodNotAllowed             = 405 // RFC 9110, 15.5.6
const StatusNotAcceptable                = 406 // RFC 9110, 15.5.7
const StatusProxyAuthRequired            = 407 // RFC 9110, 15.5.8
const StatusRequestTimeout               = 408 // RFC 9110, 15.5.9
const StatusConflict                     = 409 // RFC 9110, 15.5.10
const StatusGone                         = 410 // RFC 9110, 15.5.11
const StatusLengthRequired               = 411 // RFC 9110, 15.5.12
const StatusPreconditionFailed           = 412 // RFC 9110, 15.5.13
const StatusRequestEntityTooLarge        = 413 // RFC 9110, 15.5.14
const StatusRequestURITooLong            = 414 // RFC 9110, 15.5.15
const StatusUnsupportedMediaType         = 415 // RFC 9110, 15.5.16
const StatusRequestedRangeNotSatisfiable = 416 // RFC 9110, 15.5.17
const StatusExpectationFailed            = 417 // RFC 9110, 15.5.18
const StatusTeapot                       = 418 // RFC 9110, 15.5.19 (Unused)
const StatusMisdirectedRequest           = 421 // RFC 9110, 15.5.20
const StatusUnprocessableEntity          = 422 // RFC 9110, 15.5.21
const StatusLocked                       = 423 // RFC 4918, 11.3
const StatusFailedDependency             = 424 // RFC 4918, 11.4
const StatusTooEarly                     = 425 // RFC 8470, 5.2.
const StatusUpgradeRequired              = 426 // RFC 9110, 15.5.22
const StatusPreconditionRequired         = 428 // RFC 6585, 3
const StatusTooManyRequests              = 429 // RFC 6585, 4
const StatusRequestHeaderFieldsTooLarge  = 431 // RFC 6585, 5
const StatusUnavailableForLegalReasons   = 451 // RFC 7725, 3

const StatusInternalServerError           = 500 // RFC 9110, 15.6.1
const StatusNotImplemented                = 501 // RFC 9110, 15.6.2
const StatusBadGateway                    = 502 // RFC 9110, 15.6.3
const StatusServiceUnavailable            = 503 // RFC 9110, 15.6.4
const StatusGatewayTimeout                = 504 // RFC 9110, 15.6.5
const StatusHTTPVersionNotSupported       = 505 // RFC 9110, 15.6.6
const StatusVariantAlsoNegotiates         = 506 // RFC 2295, 8.1
const StatusInsufficientStorage           = 507 // RFC 4918, 11.5
const StatusLoopDetected                  = 508 // RFC 5842, 7.2
const StatusNotExtended                   = 510 // RFC 2774, 7
const StatusNetworkAuthenticationRequired = 511 // RFC 6585, 6

// eslint-disable-next-line import/prefer-default-export
export const getStatusText = (code: number): string => {
    switch (code) {
        case StatusContinue:
            return "Continue"
        case StatusSwitchingProtocols:
            return "Switching Protocols"
        case StatusProcessing:
            return "Processing"
        case StatusEarlyHints:
            return "Early Hints"
        case StatusOK:
            return "OK"
        case StatusCreated:
            return "Created"
        case StatusAccepted:
            return "Accepted"
        case StatusNonAuthoritativeInfo:
            return "Non-Authoritative Information"
        case StatusNoContent:
            return "No Content"
        case StatusResetContent:
            return "Reset Content"
        case StatusPartialContent:
            return "Partial Content"
        case StatusMultiStatus:
            return "Multi-Status"
        case StatusAlreadyReported:
            return "Already Reported"
        case StatusIMUsed:
            return "IM Used"
        case StatusMultipleChoices:
            return "Multiple Choices"
        case StatusMovedPermanently:
            return "Moved Permanently"
        case StatusFound:
            return "Found"
        case StatusSeeOther:
            return "See Other"
        case StatusNotModified:
            return "Not Modified"
        case StatusUseProxy:
            return "Use Proxy"
        case StatusTemporaryRedirect:
            return "Temporary Redirect"
        case StatusPermanentRedirect:
            return "Permanent Redirect"
        case StatusBadRequest:
            return "Bad Request"
        case StatusUnauthorized:
            return "Unauthorized"
        case StatusPaymentRequired:
            return "Payment Required"
        case StatusForbidden:
            return "Forbidden"
        case StatusNotFound:
            return "Not Found"
        case StatusMethodNotAllowed:
            return "Method Not Allowed"
        case StatusNotAcceptable:
            return "Not Acceptable"
        case StatusProxyAuthRequired:
            return "Proxy Authentication Required"
        case StatusRequestTimeout:
            return "Request Timeout"
        case StatusConflict:
            return "Conflict"
        case StatusGone:
            return "Gone"
        case StatusLengthRequired:
            return "Length Required"
        case StatusPreconditionFailed:
            return "Precondition Failed"
        case StatusRequestEntityTooLarge:
            return "Request Entity Too Large"
        case StatusRequestURITooLong:
            return "Request URI Too Long"
        case StatusUnsupportedMediaType:
            return "Unsupported Media Type"
        case StatusRequestedRangeNotSatisfiable:
            return "Requested Range Not Satisfiable"
        case StatusExpectationFailed:
            return "Expectation Failed"
        case StatusTeapot:
            return "I'm a teapot"
        case StatusMisdirectedRequest:
            return "Misdirected Request"
        case StatusUnprocessableEntity:
            return "Unprocessable Entity"
        case StatusLocked:
            return "Locked"
        case StatusFailedDependency:
            return "Failed Dependency"
        case StatusTooEarly:
            return "Too Early"
        case StatusUpgradeRequired:
            return "Upgrade Required"
        case StatusPreconditionRequired:
            return "Precondition Required"
        case StatusTooManyRequests:
            return "Too Many Requests"
        case StatusRequestHeaderFieldsTooLarge:
            return "Request Header Fields Too Large"
        case StatusUnavailableForLegalReasons:
            return "Unavailable For Legal Reasons"
        case StatusInternalServerError:
            return "Internal Server Error"
        case StatusNotImplemented:
            return "Not Implemented"
        case StatusBadGateway:
            return "Bad Gateway"
        case StatusServiceUnavailable:
            return "Service Unavailable"
        case StatusGatewayTimeout:
            return "Gateway Timeout"
        case StatusHTTPVersionNotSupported:
            return "HTTP Version Not Supported"
        case StatusVariantAlsoNegotiates:
            return "Variant Also Negotiates"
        case StatusInsufficientStorage:
            return "Insufficient Storage"
        case StatusLoopDetected:
            return "Loop Detected"
        case StatusNotExtended:
            return "Not Extended"
        case StatusNetworkAuthenticationRequired:
            return "Network Authentication Required"
        default:
            return ""
    }
}

