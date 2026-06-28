# 🚀 Distributed Real-Time API Monitoring Platform

> A production-inspired API monitoring platform that continuously monitors REST APIs using distributed workers, asynchronous job queues, and real-time event streaming. It automatically performs health checks, tracks latency, manages incidents, and provides real-time observability through an interactive dashboard.

<p align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![BullMQ](https://img.shields.io/badge/BullMQ-000000?style=for-the-badge)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio)

</p>

---

# 📖 Table of Contents

- Overview
- Features
- Architecture
- Tech Stack
- Project Structure
- Database Design
- Monitoring Workflow
- API Modules
- Installation
- Running the Project
- Screenshots
- Future Enhancements
- Learning Outcomes
- Author

---

# 📌 Overview

Modern applications depend on APIs for authentication, payments, notifications, analytics, and third-party integrations. Even a small API outage can impact the entire application.

This project is a **Distributed Real-Time API Monitoring Platform** that automatically monitors APIs in the background, records monitoring history, detects failures, creates incidents, sends notifications, and updates dashboards in real time.

Instead of relying on synchronous requests, the platform uses **Redis queues and BullMQ workers** to process monitoring tasks asynchronously, making the architecture scalable and production-ready.

---

# ✨ Features

- 🔐 JWT Authentication & Authorization
- 📁 Project Management
- 🌐 API Monitor Management
- ⚡ Automated Background Health Checks
- 🔄 Distributed Worker Architecture
- 📊 Real-Time Monitoring Dashboard
- 📈 Response Time & Latency Analytics
- 🚨 Automatic Incident Detection
- ✅ Automatic Incident Recovery
- 🔔 Telegram Notifications
- 📡 Live Socket.IO Updates
- 📝 Monitoring Logs
- ⚙️ Controller → Service → Repository Architecture
- 🗄️ PostgreSQL Database with Prisma ORM
- 📦 Queue-based Asynchronous Processing using BullMQ

---

# 🏗️ System Architecture

```text
                           React Frontend
                                 │
                   REST API + Socket.IO Events
                                 │
                          Express Backend
                                 │
             ┌───────────────────┼───────────────────┐
             │                   │                   │
       Controllers          Services         Background Jobs
             │                   │                   │
             └────────────Repositories───────────────┘
                                 │
                             Prisma ORM
                                 │
                           PostgreSQL
                                 │
                     ┌───────────┴───────────┐
                     │                       │
                Redis Queue            BullMQ Worker
                     │                       │
                     └──────────────► API Health Checks
                                             │
                                             ▼
                                      Monitoring Logs
                                             │
                                             ▼
                                      Incident Engine
                                             │
                 ┌───────────────────────────┴─────────────────────────┐
                 ▼                                                     ▼
         Telegram Notifications                              Socket.IO Events
```

---

# 🛠️ Tech Stack

## Frontend

- React
- TypeScript
- Tailwind CSS
- Axios
- Socket.IO Client

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Queue & Background Processing

- Redis
- BullMQ

## Authentication

- JWT
- bcrypt

## Notifications

- Telegram Bot API

## Real-Time Communication

- Socket.IO

---

# 📂 Project Structure

```text
apps
│
├── frontend
│   ├── api
│   ├── assets
│   ├── components
│   ├── layouts
│   ├── pages
│   ├── styles
│   └── socket
│
└── backend
    ├── config
    ├── middleware
    ├── modules
    │     ├── auth
    │     ├── dashboard
    │     ├── incidents
    │     ├── monitoringLogs
    │     ├── monitors
    │     ├── notifications
    │     └── projects
    │
    ├── queues
    ├── scheduler
    ├── socket
    ├── workers
    └── utils
```

---

# 🗄️ Database Design

## User

- Register
- Login
- Owns Multiple Projects

## Project

- Project Information
- Contains Multiple Monitors

## Monitor

Stores

- URL
- HTTP Method
- Timeout
- Headers
- Body
- Expected Status
- Last Status
- Average Latency
- Consecutive Failures

## Monitoring Log

Stores every API health check

- Status Code
- Response Time
- Health Status
- Error Message
- Timestamp

## Incident

Automatically created after repeated failures

- Reason
- Status
- Started At
- Resolved At

---

# ⚙️ Monitoring Workflow

```text
Create Project
      │
      ▼
Create Monitor
      │
      ▼
Scheduler
      │
      ▼
BullMQ Queue
      │
      ▼
Worker
      │
      ▼
API Health Check
      │
      ▼
Store Monitoring Log
      │
      ▼
Update Monitor Status
      │
      ▼
Detect Consecutive Failures
      │
      ▼
Create Incident
      │
      ▼
Telegram Notification
      │
      ▼
Socket.IO Event
      │
      ▼
Dashboard Updates
```

---

# 🔥 Key Functionalities

### API Health Monitoring

Continuously monitors APIs using distributed workers.

---

### Queue-based Processing

Health checks are processed asynchronously using Redis and BullMQ.

---

### Monitoring Logs

Stores every API request along with

- Response Time
- HTTP Status
- Errors
- Timestamp

---

### Incident Management

Automatically

- Creates Incidents
- Resolves Incidents
- Tracks Incident History

---

### Real-Time Dashboard

Instant dashboard updates through Socket.IO.

---

### Telegram Notifications

Automatically sends alerts when

- API goes Down
- Incident Created
- Incident Resolved

---

# 📡 REST API Modules

## Authentication

- Register
- Login

## Projects

- Create Project
- Get Projects
- Update Project
- Delete Project

## Monitors

- Create Monitor
- Get Monitors
- Update Monitor
- Delete Monitor

## Monitoring Logs

- Latest Logs
- Logs by Monitor
- Average Latency

## Incidents

- Get Incidents
- Open Incidents
- Resolved Incidents

## Dashboard

- Dashboard Analytics
- Recent Logs
- Incident Summary

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Centralized Error Handling
- Helmet
- CORS
- Request Validation

---

# 🚀 Installation

Clone Repository

```bash
git clone https://github.com/yourusername/api-monitoring-platform.git
```

Move into Project

```bash
cd api-monitoring-platform
```

Backend

```bash
cd apps/backend
npm install
```

Frontend

```bash
cd ../frontend
npm install
```

---

# ⚙️ Environment Variables

Backend `.env`

```env
DATABASE_URL=

JWT_SECRET=

REDIS_HOST=

REDIS_PORT=

TELEGRAM_BOT_TOKEN=

TELEGRAM_CHAT_ID=

PORT=5000
```

---

# ▶️ Running the Project

## Start PostgreSQL

```bash
pg_ctl start
```

---

## Start Redis

```bash
redis-server
```

---

## Backend

```bash
npm run dev
```

---

## Frontend

```bash
npm run dev
```

---

## Worker

```bash
npx ts-node src/workers/monitor.worker.ts
```

---

## Scheduler

```bash
npm run dev
```

Scheduler automatically pushes monitor jobs into BullMQ.

---

# 📷 Screenshots

Add screenshots here

```
Dashboard

Projects

Monitor Details

Incidents

Monitoring Logs
```

---

# 📈 Future Enhancements

- Docker Support
- Kubernetes Deployment
- SSL Certificate Monitoring
- Email Notifications
- Slack Integration
- Grafana Dashboard
- Prometheus Metrics
- Swagger Documentation
- CI/CD Pipeline
- Cron Scheduling
- Multi-user Organizations
- Unit Testing
- Integration Testing

---

# 🎯 Learning Outcomes

Through this project I gained practical experience in

- Distributed System Design
- Event-driven Architecture
- Queue-based Processing
- Worker-based Background Jobs
- Real-Time Communication
- REST API Development
- PostgreSQL Database Design
- Prisma ORM
- Monitoring & Observability
- Incident Management
- Production Backend Architecture

---

# 🌟 Highlights

- 🚀 Distributed Architecture
- ⚡ Real-Time Dashboard
- 📦 BullMQ Worker Processing
- 🔄 Redis Queue Management
- 📊 Monitoring Analytics
- 🔔 Telegram Alerts
- 📡 Socket.IO Integration
- 🛡️ Secure REST APIs
- 🏗️ Modular Backend Design

---

# 👨‍💻 Author

## Mohith Sai Malla

Computer Science Engineering Student

Passionate about

- Backend Development
- Distributed Systems
- Full Stack Development
- System Design
- Scalable Software Engineering

📧 Email: mallamohith20@gmail.com

🔗 LinkedIn:https://www.linkedin.com/in/mohithmalla/

⭐ If you found this project useful, don't forget to **Star** the repository!
