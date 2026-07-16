# API Reference Manual

The **LetsRead API** endpoints are exposed as serverless functions. 

## 🌐 Base URL
- **Local Dev:** `http://localhost:8888/.netlify/functions/app`
- **Production:** `https://<your-netlify-domain>.netlify.app/.netlify/functions/app`

---

## 🔒 Authentication Endpoints

### 1. User Registration
Creates a new user profile in the database.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "username": "tester",
    "email": "tester@example.com",
    "password": "securepassword123"
  }
  ```

#### Responses:
- **`201 Created`:** User successfully registered.
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "_id": "603f90...",
      "username": "tester",
      "email": "tester@example.com",
      "profilePicture": "https://dummyimage.com/100x100/000/fff&text=User",
      "bookmarks": [],
      "recently": [],
      "createdAt": "2026-07-16T13:00:00.000Z"
    }
  }
  ```
- **`500 Internal Server Error`:** Registration failed (e.g. duplicate username/email, database connection error).
  ```json
  {
    "message": "Error registering user",
    "error": "E11000 duplicate key error collection: ..."
  }
  ```

---

### 2. User Login
Verifies user credentials and returns user details.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "email": "tester@example.com",
    "password": "securepassword123"
  }
  ```

#### Responses:
- **`200 OK`:** Login credentials valid.
  ```json
  {
    "success": true,
    "message": "Login successful",
    "user": {
      "_id": "603f90...",
      "username": "tester",
      "email": "tester@example.com",
      "fullName": "Tester User",
      "profilePicture": "https://dummyimage.com/100x100/000/fff&text=User",
      "bio": "I write code and read books.",
      "bookmarks": [],
      "recently": [],
      "createdAt": "2026-07-16T13:00:00.000Z"
    },
    "token": "this is fake toke"
  }
  ```
- **`401 Unauthorized`:** Incorrect email or password.
  ```json
  {
    "success": false,
    "message": "Invalid email or password"
  }
  ```
- **`500 Internal Server Error`:** Query failed.
  ```json
  {
    "success": false,
    "message": "Error logging in",
    "error": "MongoDB connection timed out"
  }
  ```

---

## 📚 Book Catalog Endpoints

### 1. Fetch Top Rated Books
Returns the top 10 books sorted by rating in descending order.

- **URL:** `/books/top`
- **Method:** `GET`
- **Headers:** `None`
- **Request Parameters:** `None`

#### Responses:
- **`200 OK`:** Returns list of top rated books.
  ```json
  [
    {
      "_id": "603f8f...",
      "title": "To Kill a Mockingbird",
      "cover": "https://dummyimage.com/200x300/000/fff&text=To+Kill+a+Mockingbird",
      "banner": "https://dummyimage.com/1200x400/000/fff&text=To+Kill+a+Mockingbird+Banner",
      "rating": 4.8,
      "readers": 1500,
      "genres": ["Fiction", "Historical"],
      "chapters": 25
    },
    {
      "_id": "603f8e...",
      "title": "1984",
      "cover": "https://dummyimage.com/200x300/000/fff&text=1984",
      "banner": "https://dummyimage.com/1200x400/000/fff&text=1984+Banner",
      "rating": 4.7,
      "readers": 2000,
      "genres": ["Dystopian", "Science Fiction"],
      "chapters": 30
    }
  ]
  ```
- **`500 Internal Server Error`:** Query execution failed.
  ```json
  {
    "message": "Error fetching top books",
    "error": "Database error detail message"
  }
  ```

---

### 2. Fetch Recently Read Books
Returns the top 10 books sorted by the number of readers in descending order.

- **URL:** `/books/recent`
- **Method:** `GET`
- **Headers:** `None`
- **Request Parameters:** `None`

#### Responses:
- **`200 OK`:** Returns list of recently read books.
  ```json
  [
    {
      "_id": "603f8e...",
      "title": "1984",
      "cover": "https://dummyimage.com/200x300/000/fff&text=1984",
      "banner": "https://dummyimage.com/1200x400/000/fff&text=1984+Banner",
      "rating": 4.7,
      "readers": 2000,
      "genres": ["Dystopian", "Science Fiction"],
      "chapters": 30
    },
    {
      "_id": "603f8f...",
      "title": "To Kill a Mockingbird",
      "cover": "https://dummyimage.com/200x300/000/fff&text=To+Kill+a+Mockingbird",
      "banner": "https://dummyimage.com/1200x400/000/fff&text=To+Kill+a+Mockingbird+Banner",
      "rating": 4.8,
      "readers": 1500,
      "genres": ["Fiction", "Historical"],
      "chapters": 25
    }
  ]
  ```
- **`500 Internal Server Error`:** Query execution failed.
  ```json
  {
    "message": "Error fetching recently read books",
    "error": "Database error detail message"
  }
  ```
