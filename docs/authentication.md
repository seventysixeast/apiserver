# Authentication Guide & Security Analysis

This document describes the current authentication mechanism of the **LetsRead API Server**, identifies key security gaps, and details how to migrate the system to a secure production-grade implementation.

---

## 🔍 Current Authentication Mechanism

Currently, authentication is handled in a basic mock configuration in `functions/app.js`:

1. **Registration (`/auth/register`):**
   - Receives `username`, `email`, and `password` in the request body.
   - Saves the user object directly. **Passwords are saved in plain text** to the MongoDB database.
   - No hashing or salting is applied.

2. **Login (`/auth/login`):**
   - Searches MongoDB for a document matching the exact `email` and `password` values provided in the request body.
   - If found, it returns a success message along with the User document and a hardcoded string as the authorization token:
     ```json
     "token": "this is fake toke"
     ```

---

## ⚠️ Key Security Vulnerabilities

The current setup is not suitable for production deployment due to the following critical vulnerabilities:

> [!WARNING]
> **Plain Text Passwords:** If the database is compromised, all user passwords will be leaked immediately. This violates security best practices and compliance standards (like GDPR).
> 
> **Mock Session/Token:** The return token is static (`"this is fake toke"`). The client cannot use this token to verify transactions, nor does the server validate it on subsequent requests. There is no route protection or access control.

---

## 🛠️ Production Recommendations

To migrate this project to a production-grade authentication flow, developers should implement **Password Hashing** and **JSON Web Tokens (JWT)**.

### Step 1: Install Dependencies
Install `bcryptjs` (for password hashing) and `jsonwebtoken` (for creating/verifying tokens):
```bash
npm install bcryptjs jsonwebtoken
```

### Step 2: Implement Password Hashing in the User Schema
Modify `models/User.js` to hash the user's password before saving it to the database:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  // ... fields ...
});

// Pre-save hook to hash password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

### Step 3: Implement JWT Issuance on Login
Modify `/auth/login` to generate a signed JWT:

```javascript
const jwt = require('jsonwebtoken');

router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Generate Token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' } // Token valid for 7 days
    );

    // Return token (exclude password from response)
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({ success: true, message: 'Login successful', user: userResponse, token });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error logging in', error: err.message });
  }
});
```

### Step 4: Create Authentication Middleware
Create a middleware function to protect endpoints (e.g. adding a book bookmark requires a logged-in user):

```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: 'Access Denied: No Token Provided' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};
```

Apply the middleware to secure routes:
```javascript
router.get('/user/bookmarks', authenticateToken, async (req, res) => {
  // Access verified user with req.user.userId
});
```

### Environment Settings:
Add `JWT_SECRET` to your local `.env` and configure it in Netlify Environment variables for staging/production:
```ini
JWT_SECRET=super_secret_high_entropy_key_for_signing
```
