# Finora AI - Project Startup Guide

Whenever you sit down to work on this project (e.g., after restarting your computer), you need to spin up three things: the Databases, the Backend API, and the Frontend UI.

## 🐋 What is the use of Docker?
In modern development, a project rarely runs on just "Node.js." It usually needs a database (like PostgreSQL) and a caching/queue system (like Redis). 
Instead of forcing you to manually install and configure PostgreSQL and Redis on your personal Windows computer—which can cause version conflicts and messy background services—**Docker creates isolated, miniature virtual environments ("containers")** for them. 

When you run `docker-compose up -d`, Docker reads your `docker-compose.yml` file, downloads the exact versions of Postgres and Redis you need, configures the usernames and passwords automatically, and runs them silently in the background. If you ever want to wipe your database clean, you can just destroy the container and spin up a fresh one in seconds.

---

## 🚀 How to start your Finora Project

**Step 1: Start the Databases (Docker)**
Open a terminal in the root folder (`finora/`) and run:
```bash
docker-compose up -d
```
*This starts your PostgreSQL database and Redis server in the background. The `-d` flag means "detached" so you can keep using the same terminal.*

**Step 2: Start the Backend API**
In that same terminal, start the Express backend:
```bash
pnpm dev:backend
```
*This starts the API on port 4000. It connects to the Docker database and handles all authentication and business logic.*

**Step 3: Start the Frontend UI**
Open a **second, new terminal window** in the root folder (`finora/`) and run:
```bash
pnpm dev:frontend
```
*This starts Next.js on port 3000. It provides the visual interface and talks to the backend on port 4000.*

---

## 🛠️ Optional: Database Changes
If you ever change your Prisma schema (`apps/api/prisma/schema.prisma`), you will need to update the database tables by running this in a terminal:
```bash
cd apps/api
npx prisma db push
```
