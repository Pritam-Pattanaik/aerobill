# Docker for Aerobill

## Overview
A `Dockerfile` has been created to containerize the Aerobill application. It is based on `node:18-alpine` and includes specific steps to handle Prisma client generation.

## 📂 Files Created
- `Dockerfile`: Multi-stage build (deps, builder, runner)
- `.dockerignore`: Excludes unnecessary files to keep the build context light

## 🛠️ How to Build and Run (Docker)

### Prerequisites
- **Install Docker Desktop**: [Download Here](https://www.docker.com/products/docker-desktop/)

### 1. Build the Image
Run this command in the project root:
```bash
docker build -t aerobill .
```

### 2. Run the Container
Map port 3000 and pass environment variables (especially `DATABASE_URL`):
```bash
docker run -p 3000:3000 -e DATABASE_URL="postgresql://..." aerobill
```

---

## 🏃‍♂️ How to Run Locally (No Docker)

If Docker is not installed, you can run the project using `npm`:

### 1. Build the Project
Compiles the application for production:
```bash
npm run build
```

### 2. Start the Server
Starts the production server on port 3000:
```bash
npm start
```

Access the app at: `http://localhost:3000`

---

## ☁️ Google Cloud Build Troubleshooting

If your build fails on Google Cloud with errors related to "Prisma" or "Database connection", it's because the build process needs the `DATABASE_URL` to generate static pages.

### How to Fix
1.  Go to your **Cloud Build Trigger** settings.
2.  Look for **Advanced** or **Build Configuration**.
3.  Add a **Build Argument** (Substitution Variable):
    *   **Variable**: `_DATABASE_URL` (or just `DATABASE_URL`)
    *   **Value**: Your actual PostgreSQL connection string.
4.  If using `cloudbuild.yaml`, ensure you pass the argument:
    ```yaml
    steps:
      - name: 'gcr.io/cloud-builders/docker'
        args: ['build', '--build-arg', 'DATABASE_URL=${_DATABASE_URL}', '-t', '...', '.']
    ```
