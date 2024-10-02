FROM node:18-alpine as frontbuilder

COPY ./frontend /frontend
RUN cd /frontend && npm install && npm run build


FROM golang:1.23-alpine

COPY ./backend/ /app/
COPY --from=frontbuilder /frontend/dist/ /static/

RUN cd /app && \
    go mod download && \
    cd cmd/backend && \
    (CGO_ENABLED=0 GOOS=linux go build -o /green-api-app)

EXPOSE 8080

CMD ["/green-api-app"]
