# TV Shows Explorer

[Шоу агрегатор](https://tttahir.github.io/tvmaze-sa/)

## Запуск

Требуется Node.js 24 или выше.

```sh
npm ci
cp .env.example .env
npm run dev
```

Команда запускает Vite и Express параллельно через `concurrently`.
Фронтенд по умолчанию доступен на http://localhost:5173, BFF — на http://127.0.0.1:3001.

Код сервера находится в `bff/src/`, точка входа — `bff/src/index.ts`. BFF — npm workspace со своим
`package.json`; команда `npm ci` в корне устанавливает зависимости обоих пакетов.
Сервер запускается напрямую в Node.js 24 с поддержкой TypeScript.
Проверка типов BFF входит в `npm run typecheck`.
Порт BFF можно изменить через `BFF_PORT` в `.env` или переменных окружения.
После изменения порта перезапустите `npm run dev`.

Для раздельного запуска используйте `npm run dev:web` и `npm run dev:bff`.

Поиск обращается к BFF по `GET /api/shows?q=название`. Роут находится в
`bff/src/routes/shows.ts` и запрашивает TVmaze на сервере. `API_BASE_URL` в `.env`
задаёт адрес TVmaze для BFF; по умолчанию используется `https://api.tvmaze.com`.

Для запуска production-сборки:

```sh
npm run build
npm run preview
```

Для поиска в preview также запустите BFF в отдельном терминале: `npm run dev:bff`.
