# Full-Stack Task Manager

A modern task management application built with a robust NestJS backend and a seamless React Native mobile frontend.

## Tech Stack
- **Frontend:** React Native (via Expo) & TypeScript
- **Backend:** NestJS & TypeScript
- **Database:** PostgreSQL managed via Prisma 7 ORM
- **Environment:** Docker Desktop

---

## Project Directory Layout
This repository is configured as a single unified monorepo:
```text
task-manager/
├── backend/          # NestJS API code, database migration setups, and Prisma configurations
├── mobile/           # React Native application source and asset libraries (Expo wrapper)
├── docker-compose.yml# Container configuration script for local database services
└── README.md         # Master ecosystem documentation blueprint
```

## Execution Framework: Local Installation Run Guide
Follow these sequential tasks to launch the complete local development environment from a fresh terminal.

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
4. Build and Stream the Mobile Application
   1. Open a brand-new, independent terminal console window and move into your mobile app workspace directory.
   ```bash
   cd mobile
   ```
   2. Validate your design icons package extensions are installed:
   ```bash
   npm install lucide-react-native
   ```
   3. Initialize the compilation builder cache and broadcast the engine network live:
   ```bash
   npx expo start --clear
   ```
   4. Link to Phone Device: Ensure your physical smartphone is on the exact same Wi-Fi network as your computer workstation.
<<<<<<< HEAD
   5. Open your native iPhone Camera app, focus directly on the terminal's QR Code block, and accept the "Open in Expo Go" launch banner prompt.
=======
   5. Open your native iPhone Camera app, focus directly on the terminal's QR Code block, and accept the "Open in Expo Go" launch banner prompt.
>>>>>>> 3de83de (add simple UI mobile)
