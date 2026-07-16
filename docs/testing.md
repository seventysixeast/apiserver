# Testing Guide

This document describes how to test the **LetsRead API Server**. It covers manual validation methods and outlines how to set up automated unit and integration testing.

---

## 🧪 Manual Testing

Since the serverless functions run an Express application, you can test endpoints directly using tools like `curl`, Postman, or Thunder Client once your local development environment is running (`npx netlify dev`).

### 1. Verification Checklist

| Target Endpoint | HTTP Method | Expected Status | Validation Query |
|-----------------|-------------|-----------------|------------------|
| Root Status | `GET` | `200 OK` | `curl -i http://localhost:8888/.netlify/functions/app` |
| Registration | `POST` | `201 Created` | `curl -i -X POST -H "Content-Type: application/json" -d "{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"pwd\"}" http://localhost:8888/.netlify/functions/app/auth/register` |
| Login | `POST` | `200 OK` | `curl -i -X POST -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"pwd\"}" http://localhost:8888/.netlify/functions/app/auth/login` |
| Top Books Catalog| `GET` | `200 OK` | `curl -i http://localhost:8888/.netlify/functions/app/books/top` |
| Recent Books Catalog| `GET` | `200 OK` | `curl -i http://localhost:8888/.netlify/functions/app/books/recent` |

---

## 🤖 Recommended Automated Testing Setup

To implement automated tests, we recommend using **Jest** (test runner) and **Supertest** (HTTP assertion library).

### Step 1: Install Test Packages
Install the required devDependencies:
```bash
npm install --save-dev jest supertest
```

### Step 2: Configure NPM Scripts
Update `package.json` to change the `"test"` script:
```json
"scripts": {
  "test": "jest --runInBand --detectOpenHandles"
}
```
*Note: `--runInBand` is recommended when testing against databases to prevent parallel test transactions from causing data conflicts.*

### Step 3: Example Integration Test (`tests/app.test.js`)
Create a `tests` directory and add an integration test:

```javascript
const request = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const serverless = require('serverless-http');

// Setup temporary Express instance or import app logic
// To test app.js, export the 'app' from functions/app.js alongside the lambda handler.
const app = require('../functions/app'); // Requires exporting app in app.js: module.exports.app = app;

describe('GET /books/top', () => {
  // Establish connection before running tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/books_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // Close connection after tests
  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  it('should return top 10 books sorted by rating', async () => {
    const res = await request(app)
      .get('/.netlify/functions/app/books/top')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeLessThanOrEqual(10);
    
    // Check if sorted descending by rating
    if (res.body.length > 1) {
      expect(res.body[0].rating).toBeGreaterThanOrEqual(res.body[1].rating);
    }
  });
});
```

---

## ⚙️ Testing in CI/CD

If using a CI/CD service (e.g. GitHub Actions, GitLab CI), configure a job to run tests before allowing a merge to the `main` branch.

### Sample GitHub Actions Workflow (`.github/workflows/test.yml`):
```yaml
name: Node.js CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      mongodb:
        image: mongo:6.0
        ports:
          - 27017:27017

    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js 18
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: 'npm'
      - run: npm ci
      - run: npm test
        env:
          MONGO_URI_TEST: mongodb://localhost:27017/books_test
```
This sets up a containerized MongoDB service instance, downloads project dependencies, and runs the test suites automatically on every commit.
