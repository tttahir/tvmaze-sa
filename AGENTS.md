# Инструкции проекта

## Архитектура

При разработке, рефакторинге и ревью React-компонентов, изменении их логики,
структуры используй скилл
[architecture](.agents/skills/architecture/SKILL.md).
Правила архитектуры проекта собраны в этом скилле.

Во все хуки `usePresenter` передавай полный объект `props` компонента,
в котором они вызываются: `usePresenter(props)`.

Пропсы, которые не требуют обработки в Presenter, используй во View напрямую
через `props`, например `props.isLoading`. Не возвращай неизменённые пропсы
из `usePresenter`: возвращай только данные и обработчики, которые он формирует.

## Именование

Следуй правилам из
[api-and-interface-design — «5. Predictable Naming»](https://github.com/addyosmani/agent-skills/blob/main/skills/api-and-interface-design/SKILL.md#5-predictable-naming):

- REST-эндпоинты называй существительными во множественном числе, без глаголов:
  `GET /api/tasks`, `POST /api/tasks`.
- Для query-параметров используй `camelCase`: `sortBy`, `pageSize`.
- Для полей ответов используй `camelCase`: `createdAt`, `updatedAt`, `taskId`.
- Булевые переменные, поля объектов и пропсы называй с префиксами `is`, `has`
  или `can`: `isLoading`, `isComplete`, `hasAttachments`, `canEdit`.
  Используй `is` для состояния или свойства, `has` для наличия, `can` для
  возможности или разрешения.
- Для значений перечислений используй `UPPER_SNAKE_CASE`: `IN_PROGRESS`, `COMPLETED`.

## UI-компоненты и иконки

Для базовых UI-компонентов используй @base-ui/react, для иконок — @phosphor-icons/react.

## Коммиты

Для сообщений коммитов используй
[Conventional Commits](https://www.conventionalcommits.org/ru/v1.0.0/)
и правила из `commitlint.config.js`.

Формат: `<type>(<scope>): <description>`, где `scope` необязателен.
Например: `feat(search): add genre filters`, `fix: handle empty results`.
Несовместимые изменения отмечай `!` перед двоеточием или футером `BREAKING CHANGE:`.
