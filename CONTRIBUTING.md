# Contributing to LetsRead API Server

Thank you for your interest in contributing to the **LetsRead API Server**! To ensure a smooth development process and maintain high code quality, please adhere to the guidelines outlined below.

---

## 🛠️ Development Workflow

### 1. Branching Strategy
We use a feature-branch workflow. Follow this naming convention for branches:
- **Features:** `feature/description-of-change` (e.g., `feature/add-jwt-auth`)
- **Bug Fixes:** `bugfix/description-of-fix` (e.g., `bugfix/fix-db-leak`)
- **Documentation:** `docs/description` (e.g., `docs/update-api-spec`)
- **Hotfixes:** `hotfix/description` (for urgent production fixes)

### 2. Local Setup
1. Fork and clone the repository.
2. Setup your local `.env` configuration (see [setup.md](file:///e:/76EAST/apiserver/docs/setup.md)).
3. Create your branch from the `main` (or designated development) branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 📝 Coding Standards

Before submitting your code, please ensure it complies with the following guidelines:

- **Linting & Formatting:** Follow standard JavaScript code style. Ensure your IDE is using formatting rules outlined in [coding-standards.md](file:///e:/76EAST/apiserver/docs/coding-standards.md).
- **ES6+ Syntax:** Use modern JS features (const/let, arrow functions, async/await).
- **Error Handling:** All route operations should be wrapped in `try/catch` blocks with descriptive HTTP response codes (e.g., `500` for server errors, `400` for bad requests, `401` for unauthorized).
- **Clean Git History:** Commit message format should be descriptive:
  - `feat: add book search endpoint`
  - `fix: resolve user login null check error`
  - `docs: update deployment instructions`

---

## 🧪 Testing Guidelines

Although the project currently uses a serverless setup, you must run and write tests before submitting any major change.
1. Run local verification by running `npx netlify dev` and testing the endpoint with Postman or Curl.
2. If unit tests exist (or are added under `/tests`), run them using the test command:
   ```bash
   npm test
   ```
3. See [testing.md](file:///e:/76EAST/apiserver/docs/testing.md) for more info on how to write/run tests in this workspace.

---

## 🚀 Pull Request Process

1. **Push your branch** to your fork or remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```
2. **Open a Pull Request (PR)** against the `main` branch.
3. Fill out the PR template with:
   - What changes were made.
   - Why they were made.
   - How they were tested (provide curl commands or test cases).
4. **Code Review:** At least one other team member must review and approve your PR before it is merged.
5. Once approved, the branch will be merged, and the automated CI/CD pipeline will deploy the updates to the staging server.
