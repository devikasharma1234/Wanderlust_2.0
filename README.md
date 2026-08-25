# 🌍 Wanderlust 2.0

> A scalable full-stack rental platform where guests discover and book unique accommodations, and hosts manage their listings — all with seamless payments and real-time media storage.

---

## 📌 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Screenshots](#screenshots)
- [Author](#author)

---

## About

Wanderlust 2.0 is a production-ready accommodation booking platform inspired by Airbnb. It supports two distinct user roles — **Guests** and **Hosts** — each with tailored access controls. Hosts can create, update, and manage listings with image uploads, while guests can browse, review, and book accommodations with integrated Razorpay payments.

---

## ✨ Features

- 🔐 **Authentication & Authorization** — Secure signup/login with Passport.js (local strategy) and role-based access control (RBAC) for guests and hosts
- 🏠 **Listing Management** — Full CRUD for travel listings including title, description, price, location, and images
- 💳 **Payments** — Razorpay integration for seamless and secure booking payments
- 🖼️ **Cloud Media Storage** — Cloudinary + Multer for image uploads and optimization
- 🗺️ **Interactive Maps** — Mapbox SDK integration for location visualization
- ⭐ **Review System** — Guests can leave ratings and comments on listings
- 🔔 **Flash Notifications** — Real-time user feedback on actions using connect-flash
- 📱 **Responsive Design** — Mobile-first UI built with Bootstrap and EJS templates
- 🐳 **Dockerized** — Fully containerized with Docker and Docker Compose for consistent environments
- ⚙️ **CI/CD** — GitHub Actions pipeline for automated build and deployment

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|--------------|-------------------------------------------------|
| **Runtime**  | Node.js v22.17.1                                |
| **Framework**| Express.js v5                                   |
| **Templating**| EJS + EJS-Mate                                 |
| **Database** | MongoDB Atlas + Mongoose                        |
| **Auth**     | Passport.js, passport-local, passport-local-mongoose |
| **Payments** | Razorpay                                        |
| **Storage**  | Cloudinary + Multer + multer-storage-cloudinary |
| **Maps**     | Mapbox SDK (`@mapbox/mapbox-sdk`)               |
| **Validation**| Joi                                            |
| **Session**  | express-session + connect-mongo                 |
| **DevOps**   | Docker, Docker Compose, GitHub Actions          |
| **Hosting**  | Render                                          |

---

## 📁 Project Structure

```
Wanderlust_2.0/
├── .github/
│   └── workflows/         # CI/CD GitHub Actions
├── controllers/           # Route handler logic (listings, reviews, users, payments)
├── init/                  # Database seed scripts
├── models/                # Mongoose schemas (Listing, Review, User)
├── public/                # Static assets (CSS, JS, images)
├── routes/                # Express routers
├── utils/                 # Helper utilities (error handling, async wrappers)
├── views/                 # EJS templates and layouts
├── app.js                 # Express app entry point
├── cloudConfig.js         # Cloudinary configuration
├── middleware.js          # Custom middleware (auth, ownership checks)
├── schema.js              # Joi validation schemas
├── seed.js                # DB seeding script
├── Dockerfile
├── compose.yaml
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v22+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account
- Razorpay account
- Mapbox account

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/devikasharma1234/Wanderlust_2.0.git
cd Wanderlust_2.0

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env

# 4. (Optional) Seed the database
node seed.js

# 5. Start the server
node app.js
```

The app will run at `http://localhost:3000`.

---

## 🐳 Docker Setup

Run the entire app in Docker without any local setup:

```bash
# Build and start all services
docker compose up --build

# Stop services
docker compose down
```

Refer to [README.Docker.md](./README.Docker.md) for additional Docker-specific guidance.

---

## ⚙️ CI/CD Pipeline

This project uses **GitHub Actions** for automated CI/CD. The workflow (`.github/workflows/`) handles:

- Dependency installation
- Build verification
- Automated deployment on push to `main`

---

## 👩‍💻 Author

**Devika Sharma**  

[![GitHub](https://img.shields.io/badge/GitHub-devikasharma1234-181717?logo=github)](https://github.com/devikasharma1234)

---

## 📄 License

This project is licensed under the **ISC License**.
