http://localhost:3000/api/users/create-super

# Корпоративная платформа ЦРО 7

Пет-проект для ГБОУ ЦРО №7. Корпоративная платформа для сотрудников с возможностью записи на обед, заполнения оценочных листов,
получения списка воспитанников и администрирования этих процессов.

## Инструкция по сборке и запуску

- Клонировать репозиторий

```bash
git clone git@github.com:yaroslav-patrikeev/cro7.git
```

- Перейти в директорию проекта

```bash
cd cro7/
```

### Запуск frontend

- Перейти в директорию frontend

```bash
cd frontend/
```

- Установить зависимости

```bash
yarn
```

- Запустить проект

```bash
yarn dev
```

### Запуск backend

- Перейти в директорию backend

```bash
cd backend/
```

- Установить зависимости

```bash
yarn
```

- Создать файл .env с содержимым. Указать DATABASE_URL.

```
PORT = 3000
NODE_ENV = 'development'
JWT_SECRET = 'fghfghpogffgfgf';
DATABASE_URL=""
```

- Запустить проект

```bash
yarn dev
```

### Авторизация в приложении

- Сделать get-запрос по url

````bash
curl http://localhost:3000/api/create-super
```

- Использовать для входа

```
логин: admin@admin.ru
пароль: 123456Aa!
````

## Стэк технологий

### Frontend

- HTML, SCSS, JavaScript, React
- Vite, Axios, React Hook Form, React Icons

### Backend

- Express, PostgreSQL, Prisma

```

```
