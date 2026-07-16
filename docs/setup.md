# Local Development Setup Guide

This guide describes how to set up the **LetsRead API Server** from scratch on your local machine for development and testing.

---

## 📋 Prerequisites

Ensure you have the following software installed:

- **Node.js:** version `18.x` or later (LTS version recommended).
- **NPM:** (automatically bundled with Node.js).
- **MongoDB:** Either:
  - A local MongoDB instance running (Community Edition).
  - A free MongoDB Atlas Cloud database cluster.

---

## 🛠️ Step-by-Step Installation

### Step 1: Clone the Repository
Clone the repository to your local machine and navigate into the project directory:
```bash
git clone <repository-url>
cd apiserver
```

### Step 2: Install Node Dependencies
Install the project dependencies defined in `package.json`:
```bash
npm install
```
This will install all necessary packages including Express, Mongoose, Serverless-HTTP, and `netlify-cli` for local serverless execution.

### Step 3: Configure Environment Variables
Copy the template configuration file:
```bash
cp .env.example .env
```
Open the `.env` file in your preferred code editor and set up your connection settings:
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/flutter_books
```

*Note:* If using MongoDB Atlas, replace `mongodb://localhost:27017/flutter_books` with your connection string. Make sure to whitelist your local IP address in the MongoDB Atlas dashboard.

---

## 🗄️ Database Seeding

The repository contains a seeding script `seed.js` to populate your database with dummy catalog items (books) and sample users. This is important to verify database connectivity.

To seed the database, run:
```bash
node seed.js
```

### Expected Output:
```
MongoDB connected
Dummy data added
```
If you encounter a connection error, verify that MongoDB is running and that your `MONGO_URI` is correct.

---

## 🚀 Running the Server Locally

Since the application is built to run as serverless functions, we use the **Netlify CLI** to emulate the Netlify Cloud environment locally.

### Start the Development Server
You can start the serverless local environment using either Netlify Dev or directly via NPM scripts if configured. Run the following command:
```bash
npx netlify dev
```

The CLI will:
1. Load environment variables from `.env`.
2. Emulate Netlify's serverless routing.
3. Start a local server (typically at `http://localhost:8888`).

### Accessing Endpoints
The local function endpoint will be accessible at:
```
http://localhost:8888/.netlify/functions/app
```

To test if the server is running, visit `http://localhost:8888/.netlify/functions/app` in your browser. You should see:
```
API Server Running
```

---

## 🧪 Verifying Endpoints (Smoke Test)

You can run a quick check using `curl` or Postman to ensure database queries are working:

### Fetch Top Books:
```bash
curl -X GET http://localhost:8888/.netlify/functions/app/books/top
```

### Response (JSON Array of Books):
```json
[
  {
    "_id": "603f...",
    "title": "To Kill a Mockingbird",
    "cover": "https://dummyimage.com/...",
    "banner": "https://dummyimage.com/...",
    "rating": 4.8,
    "readers": 1500,
    "genres": ["Fiction", "Historical"],
    "chapters": 25
  },
  ...
]
```
If you receive the expected JSON output, your local setup is fully complete and ready for development!
