# Coding Standards & Guidelines

This document outlines the code conventions and guidelines for writing JavaScript in the **LetsRead API Server**. Consistent styling ensures the codebase remains readable, maintainable, and easy to review.

---

## 🎨 Style Preferences

We adhere to the following base rules (aligned with standard JavaScript code conventions):

- **Indentation:** Use **2 spaces** for indentation. Do not use tabs.
- **Quotes:** Use **single quotes** (`'`) for string literals. Use template literals (backticks `` ` ``) for string interpolation.
- **Semicolons:** Always terminate statements with **semicolons** (`;`).
- **File Endings:** Maintain a newline at the end of every file.
- **Line Length:** Try to limit code lines to 100 characters for readability.

---

## 🏷️ Naming Conventions

### 1. Variables and Functions
- Use **camelCase** for variables, functions, and properties:
  ```javascript
  const userRecord = await User.findOne({ email });
  function getTopRatedBooks() { ... }
  ```

### 2. Classes and Mongoose Models
- Use **PascalCase** for classes, constructible instances, and mongoose model exports:
  ```javascript
  const User = require('../models/User');
  const Book = require('../models/Book');
  ```

### 3. File Names
- Model files: **PascalCase** matches model name (`models/User.js`, `models/Book.js`).
- Routes/Functions: **camelCase** or short nouns (`functions/app.js`, `seed.js`).

### 4. Constants
- Use **UPPER_SNAKE_CASE** for config values and static global constants:
  ```javascript
  const PORT = process.env.PORT || 5000;
  const MAX_BOOK_LIMIT = 10;
  ```

---

## ⚙️ Modern Javascript Syntax (ES6+)

- Use `const` by default. Use `let` only if the variable's reference will be reassigned. Never use `var`.
- Use **Arrow Functions** for anonymous callback functions:
  ```javascript
  mongoose.connect(URI).then(() => console.log('Connected'));
  ```
- Use **Async / Await** instead of raw Promise chains (`.then()/.catch()`) for cleaner, synchronous-like asynchronous operations:
  ```javascript
  // Recommended
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  ```

---

## ⚠️ Error Handling & Response Consistency

### Route Handler Rules
1. **Try-Catch wrapper:** All asynchronous controller operations must be wrapped in `try/catch` blocks.
2. **Standard response codes:**
   - `200 OK`: Successful reading or modification of resources.
   - `201 Created`: Successful creation of resources (e.g. registration).
   - `400 Bad Request`: Incorrect payloads or missing required fields.
   - `401 Unauthorized`: Invalid credentials or missing tokens.
   - `403 Forbidden`: Authenticated user does not have permission.
   - `404 Not Found`: Resource does not exist.
   - `500 Internal Server Error`: Unhandled server/database errors.

3. **Consistent Error Payload Shapes:**
   Always return a JSON object containing a brief message and, if helpful, the detailed error message:
   ```json
   {
     "message": "Friendly error summary description",
     "error": "Detailed error object message (for debugging)"
   }
   ```
