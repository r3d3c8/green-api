# Тестовое задание GreenApi

## Структура

Проект содержит 3 папки
- backend - исходные файлы для запуска backend, написаны на Go
- frontend - исходные файлы для сборки frontend, написан на React
- docker - файлы для сборки контейнера с приложением


## Использование

Для запуска проекта необходимо
- клонировать репозиторий
```bash
git clone https://github.com/r3d3c8/green-api.git
```
- перейти в папку green-api/docker
```bash
cd green-api/docker
```

- скопировать app.env.template в app.env и указать правильные значения (см. Опции)
```bash
cp app.env.template app.env
nano app.env
```

- выполнить сборку и запуск контейнера
```bash
docker compose up
```

## Опции

Через переменные окружения возможна настройка следующих параметров 
- GREEN_API_URL - url GreenApi в формате https://xxxx.api.green-api.com
- DEBUG_LOG - если задана не пустая строка, то включается вывод логов в stdout


