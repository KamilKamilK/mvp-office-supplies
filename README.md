# MVP Office Supplies

MVP Office Supplies is a sample full-stack project built with:

- **Frontend:** Vue.js
- **Backend:** Symfony + API Platform
- **Database:** MySQL
- **Containerization:** Docker & Docker Compose

This project demonstrates a modern stack with API-driven backend and SPA frontend.

---

## Requirements

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) and [Yarn](https://yarnpkg.com/) (for frontend development)

---

## Project Structure

```
project-root/
├─ api/           # Symfony backend with API Platform
│  ├─ config/
│  ├─ public/
│  ├─ src/
│  └─ ...
├─ frontend/      # Vue.js frontend
├─ docker/        # Dockerfiles and nginx configuration
├─ docker-compose.yml
└─ README.md
```

---

## Setup & Run

### 1. Build and start Docker containers

```bash
docker-compose up --build -d
```

This will start:

- `php-container` (Symfony + PHP-FPM)
- `nginx-container` (web server)
- `mysql-container` (database)

---

### 2. Install backend dependencies

```bash
docker exec -it php-container composer install
```

---

### 3. Install frontend dependencies and build assets

```bash
cd frontend
yarn install
yarn build        # For production build
```

Or for development with hot-reload:

```bash
yarn dev
```

---

### 4. Install Symfony assets

```bash
docker exec -it php-container php bin/console assets:install public
```

---

### 5. Clear Symfony cache

```bash
docker exec -it php-container php bin/console cache:clear
```

---

## Accessing the Application

- **Frontend (Vue.js):** [http://localhost:8080](http://localhost:8080)
- **API (Symfony + API Platform):** [http://localhost:8080/api](http://localhost:8080/api)

---
