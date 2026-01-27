# POS Application (Assignment Project)

A minimal, production-ready POS-style application built as part of a technical assignment.  
The goal of this project is to demonstrate clean code structure, correct decision-making, and the ability to design and deploy a working system, not to over-engineer features.

---

## Overview

This project implements a small POS system with:

- Secure authentication
- Product management
- Sales processing with stock validation
- Redis caching
- Clean backend architecture using NestJS
- A simple, functional admin-style frontend

The system is intentionally kept minimal while maintaining production-level code quality and scalability.

---

## System Architecture

The application follows a **monorepo structure** with a clear separation between frontend and backend.

![System Architecture Diagram](./docs/architecture-diagram.png)

### High-level flow:

- React frontend communicates with the NestJS backend via REST APIs
- JWT-based authentication secures protected routes
- PostgreSQL stores persistent data
- Redis is used for caching frequently accessed data
- Prisma handles database access and migrations

---

## Database Design

The database schema is designed to be simple, consistent, and future-proof.

![Database Schema Diagram](./docs/database-schema.png)

### Core entities:

- **User**: Handles authentication
- **Product**: Stores product inventory
- **Sale**: Records sales and ensures stock consistency

---

## Tech Stack

### Backend

- NestJS
- PostgreSQL
- Prisma ORM
- Redis
- JWT Authentication

### Frontend

- Vite + React (TypeScript)
- Ant Design
- TanStack Query
- Axios

---

## Core Features

### Authentication

- Email & password login
- JWT-based authentication
- Protected APIs and frontend routes
- Minimal register endpoint (backend-only) for initial user setup

### Product Management

- Create, list, update, and delete products
- Fields:
  - Name
  - SKU (unique)
  - Price
  - Stock quantity
- Validation at API level

### Sales

- Create a sale
- Automatically deduct stock on sale
- Prevent sales when stock is insufficient
- Uses database transactions to ensure consistency

---

## Project Structure

pos-app/
├── backend/
│ ├── src/
│ │ ├── auth/
│ │ ├── users/
│ │ ├── products/
│ │ ├── sales/
│ │ ├── prisma/
│ │ └── main.ts
│ └── prisma/
│ └── schema.prisma
├── frontend/
│ └── src/
│ ├── api/
│ ├── pages/
│ ├── components/
│ └── hooks/
├── postman/
│ └── pos-api.postman_collection.json
└── README.md

---

## Running the Project Locally

### Backend

```bash
cd backend
npm install
npm run start:dev
Frontend
cd frontend
npm install
npm run dev
🔐 Environment Variables
Backend (.env)
DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET=your_jwt_secret
REDIS_URL=redis://host:port
```

## API Documentation

A Postman collection is included in the postman/ directory for testing all endpoints.

## Notes & Decisions

What was completed
Authentication with JWT
Product CRUD
Sales with stock validation and transactions
Redis caching
Frontend integration
Deployment-ready structure
What was intentionally not included
Role-based access control
Pagination & advanced filtering
Public user registration UI

## Why

The focus was on delivering the required assignment scope with clean, scalable architecture within a limited timeframe.
The current structure allows these features to be added later without refactoring core logic.

## Conclusion

This project demonstrates a clean, scalable MVP-style POS system built with production principles while avoiding unnecessary complexity.
