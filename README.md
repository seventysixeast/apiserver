# LetsRead API Server

Welcome to the **LetsRead API Server**. This repository contains the serverless backend API for the LetsRead mobile application. The server is built using Node.js, Express, and Mongoose (MongoDB), and is packaged to deploy seamlessly as serverless functions on [Netlify](https://www.netlify.com/).

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Configuration](#-environment-configuration)
- [Documentation Index](#-documentation-index)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

The LetsRead API Server is designed to provide backend services for user authentication, profile management, and catalog browsing. 

### Key Features:
- **Serverless Architecture:** Configured via `netlify.toml` and served via `serverless-http` and Netlify Functions.
- **Express-powered routing:** Familiar web-framework architecture running inside serverless handlers.
- **MongoDB Integration:** Managed connections with MongoDB Atlas via Mongoose ODM.
- **User Authentication:** Ready-made endpoints for signup and login.
- **Catalog Management:** Retrieval of top and recently read books.

---

## 📁 Project Structure

Here is an overview of the directory layout of this repository:

```
├── .env.example              # Template for environment configuration
├── .gitignore                # Git ignore patterns
├── netlify.toml              # Netlify build and deployment config
├── package.json              # NPM dependencies and build commands
├── seed.js                   # Seeding script for catalog and dummy users
├── functions/
│   └── app.js                # Core Express API serverless handler
├── models/
│   ├── Book.js               # MongoDB Mongoose model for Books
│   └── User.js               # MongoDB Mongoose model for Users
└── docs/                     # Detailed developer and operational guides
    ├── setup.md              # Local workspace setup guide
    ├── architecture.md       # Architecture diagram and system design
    ├── database.md           # Database schemas and indexing
    ├── api.md                # Comprehensive API routes reference
    ├── authentication.md     # Auth flow details (current state & suggestions)
    ├── deployment.md         # Staging/Prod setup and Netlify commands
    ├── testing.md            # Testing strategies and runners
    ├── troubleshooting.md    # Known errors and debugging tips
    ├── coding-standards.md   # Coding guidelines and formatting rules
    └── decisions/            # Architecture Decision Records (ADRs)
        ├── ADR-001.md        # ADR on Serverless Express architecture
        └── ADR-002.md        # ADR on MongoDB choice
```

---

## ⚡ Quick Start

### 1. Prerequisites
Make sure you have the following installed locally:
- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [NPM](https://www.npmjs.com/) (installed with Node)
- [MongoDB](https://www.mongodb.com/) (running locally or a remote MongoDB Atlas URI)

### 2. Install Dependencies
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### 3. Setup Environment Variables
Copy the example environment file and configure your local variables:
```bash
cp .env.example .env
```
Open `.env` and fill in your connection details (e.g., `MONGO_URI` and `PORT`).

### 4. Seed the Database
To populate your MongoDB database with sample users and books, run:
```bash
node seed.js
```

### 5. Run Locally
To run the serverless function locally, use the Netlify CLI. If you don't have it installed globally, you can run it via `npx`:
```bash
npx netlify dev
```
The local server will startup (typically on `http://localhost:8888`) and expose the function endpoint at `http://localhost:8888/.netlify/functions/app`.

---

## ⚙️ Environment Configuration

The following variables are required to configure the application (defined in `.env`):

| Variable | Description | Example / Default |
|----------|-------------|-------------------|
| `PORT` | Local server fallback port | `5000` |
| `MONGO_URI` | Connection URI to MongoDB Atlas or local DB | `mongodb://localhost:27017/flutter_books` |

---

## 📚 Documentation Index

For in-depth guides, check the files in the `/docs` directory:

1. **System & Design**
   - [System Architecture](file:///e:/76EAST/apiserver/docs/architecture.md): Visual design, component relationships, and data flow.
   - [Database Guide](file:///e:/76EAST/apiserver/docs/database.md): Mongoose schemas, relations, and index explanations.
   - [API Reference](file:///e:/76EAST/apiserver/docs/api.md): Detailed API endpoint parameters, requests, and response examples.
   - [Authentication](file:///e:/76EAST/apiserver/docs/authentication.md): Authentication design and security protocols.

2. **Operations & Maintenance**
   - [Local Setup Guide](file:///e:/76EAST/apiserver/docs/setup.md): Complete setup walkthrough and seeding.
   - [Deployment Guide](file:///e:/76EAST/apiserver/docs/deployment.md): Steps for deploying staging and production environments to Netlify.
   - [Testing Guide](file:///e:/76EAST/apiserver/docs/testing.md): Running and writing tests.
   - [Troubleshooting Manual](file:///e:/76EAST/apiserver/docs/troubleshooting.md): Diagnosing connection errors, serverless timeouts, and log locations.

3. **Standards & Decisions**
   - [Coding Standards](file:///e:/76EAST/apiserver/docs/coding-standards.md): Code style preferences, naming conventions, and patterns.
   - [ADR-001 (Serverless Express)](file:///e:/76EAST/apiserver/docs/decisions/ADR-001.md): Decision to use Express with serverless-http.
   - [ADR-002 (MongoDB/Mongoose)](file:///e:/76EAST/apiserver/docs/decisions/ADR-002.md): Decision to use MongoDB for book metadata storage.

---

## 🤝 Contributing

Contributions to the LetsRead API Server are welcome! Please review [CONTRIBUTING.md](file:///e:/76EAST/apiserver/CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](file:///e:/76EAST/apiserver/LICENSE) file for details.
