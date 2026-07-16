# Troubleshooting Manual

This manual provides troubleshooting advice for common errors and operational hurdles encountered in the development and deployment of the **LetsRead API Server**.

---

## 🗄️ Database Connection Issues

### Issue 1: `MongooseServerSelectionError: connection timed out` or `Could not connect to MongoDB`
- **Symptom:** The console prints `MongoDB connection error` and API requests hang or return a 500 status code.
- **Possible Causes & Solutions:**
  1. **MongoDB is not running locally:** If connecting to a local DB, ensure the MongoDB service is active.
     - On macOS: `brew services start mongodb-community`
     - On Windows: Open Services (`services.msc`), find `MongoDB Server`, and click **Start**.
  2. **IP Whitelist Configuration:** If connecting to MongoDB Atlas, your local developer environment IP address must be added to the database security access settings.
     - Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
     - Go to **Network Access** under Security.
     - Click **Add IP Address** and add your current public IP, or select `0.0.0.0/0` (Allow access from anywhere - recommended only for testing).
  3. **Incorrect URI Secrets:** Double-check that your `.env` does not contain spaces or unescaped characters in the username or password fields of the connection string.

---

## ⚡ Serverless Function & Netlify Errors

### Issue 2: `Netlify Function Timeout` (Function takes more than 10-26 seconds)
- **Symptom:** Endpoint requests return a `502 Bad Gateway` or `Endpoint request timed out` message from Netlify.
- **Explanation:** Netlify functions have a hard execution limit of **10 seconds** (can be bumped up to 26 seconds on paid tiers). If a query or process keeps the Node.js event loop active, the execution context won't shut down.
- **Solutions:**
  - **Mongoose Connection Reuse:** Make sure Mongoose does not attempt to create a brand new connection on every single API invocation. Keep the connection code outside of the Express handler loop.
  - **Slow Database Queries:** Ensure your MongoDB clusters are not overloaded, are placed in a region physically close to your Netlify deploy region, and that query collections are properly indexed.

---

## 🌐 CORS (Cross-Origin Resource Sharing) Failures

### Issue 3: Client blocked by CORS policy (e.g. Flutter Web or browser client)
- **Symptom:** The client console prints: `Access to fetch at ... has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present...`
- **Solution:** Check the CORS setup in `functions/app.js`:
  ```javascript
  app.use(cors());
  ```
  By default, `cors()` enables access for all origins (`*`). If you need to restrict this to specific origins (e.g., your staging/production web URLs):
  ```javascript
  app.use(cors({
    origin: ['https://letsread.pub', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  ```

---

## 🌱 Seeding Data Conflicts

### Issue 4: `MongoServerError: E11000 duplicate key error collection`
- **Symptom:** Running `node seed.js` crashes the script with a duplicate key error.
- **Root Cause:** The database already contains users or books with the unique indices being seeded (such as unique `username` or `email`).
- **Solution:** Edit `seed.js` to clear collections before performing insertion. Uncomment the database cleanup methods:
  ```javascript
  // Open seed.js and uncomment these lines:
  await Book.deleteMany(); // Clear existing data
  await User.deleteMany();
  ```
  Run `node seed.js` again. *Warning: This wipes existing records, so only do this in testing and development databases.*
