# Shop Backend

A teaching e-commerce backend built with Express.js and SQLite.

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run db:reset
npm run dev
```

On Windows:

```cmd
copy .env.example .env
```

Base URL: `http://localhost:4000`

## Quick Test

```
GET http://localhost:4000/api/health
GET http://localhost:4000/api/products
```
