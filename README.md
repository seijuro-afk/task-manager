# Full-Stack Task Manager

A modern task management application built with a robust NestJS backend and a seamless React Native mobile frontend.

## Tech Stack
- **Frontend:** React Native (via Expo) & TypeScript
- **Backend:** NestJS & TypeScript
- **Database:** PostgreSQL managed via Prisma 7 ORM
- **Environment:** Docker Desktop

---

## How to Run the App After Cloning

Follow these steps to get your local environment running from scratch if you've just cloned the repository.

### 1. Prerequisites
Make sure you have the following installed on your machine:
- [Node.js (LTS)](https://nodejs.org/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Expo Go App](https://expo.dev/client) (Installed on your physical smartphone)

### 2. Setup the Local Database
1. Launch **Docker Desktop** on your machine.
2. Open your terminal in the root directory and boot up the database container:
   ```bash
   docker compose up -d
   ```
3. Configure and Start the Backend
    1. Move into the backend directory:
    ```bash
        cd backend
    ```
    2. Install all necessary backend dependencies:
    ```bash
    npm install
    ```
    3. Create a local environment file named .env inside the backend/ folder and paste your connection string:
    ```bash
    DATABASE_URL="postgresql://admin:password123@localhost:5432/taskdb?schema=public"
    ```
    4. Run the database migrations to build your tables and generate your Prisma client:
    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```
    5. Fire up the NestJS API development server:
    ```bash
    npm run start:dev
    ```