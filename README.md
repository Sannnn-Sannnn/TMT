# TMT - Time Makes Tasks

---

TMT is a productivity-focused web application that provides easy task tracking and a customizable Pomodoro timer, allowing users to organize their study sessions and tasks for a day, week or month.

---

## Architecture
- Frontend: React + Vite
- Backend: Express
- Database: PostgreSQL
- Package manager: pnpm

---

## Requirements
* Node.js 24.x
* pnpm 11.x
* PostgreSQL 16.x

---

## Installation
### Frontend
```
cd web
pnpm install
```

### Backend
```
cd api
pnpm install
pnpm prisma migrate dev
pnpm prisma generate
```

---

## Run
### Frontend
```
cd web
pnpm dev
```

### Backend
```
cd api
pnpm dev
```

---

## Deploy

**Web application**: https://timemakestasks.vercel.app/

The web page is deployed on **Vercel**, while the API is hosted on **Render**.  
> **Note:** Since the backend is hosted on Render's free tier, the first request after a period of inactivity may take up to 50 seconds to respond.