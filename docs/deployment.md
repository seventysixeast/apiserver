# Deployment Guide: Staging & Production

The **LetsRead API Server** is built to run as serverless functions and is optimized for deployment on the [Netlify](https://www.netlify.com/) hosting platform.

---

## ⚙️ Deployment Configuration (`netlify.toml`)

Netlify deployment behavior is defined by `netlify.toml` in the root of the repository:
```toml
[build]
    functions = "functions"
```
This directs Netlify to bundle and deploy any handlers located in the `/functions` directory as AWS Lambda-based serverless functions. The endpoint is routed automatically under `/.netlify/functions/<filename>`.

---

## 🏗️ Environment Pipeline Strategy

It is recommended to split your environments into **Staging** and **Production** using continuous integration linked to your Git branches.

```mermaid
graph LR
    Dev[Feature Branch] -->|PR Merge| MainBranch[main branch]
    MainBranch -->|Auto trigger CI/CD| StagingNetlify[Staging Netlify Site]
    StagingNetlify -->|Database| StagingDB[(MongoDB Atlas Staging)]
    
    MainBranch -->|Tag Release / Manual| ProdNetlify[Production Netlify Site]
    ProdNetlify -->|Database| ProdDB[(MongoDB Atlas Prod)]
```

### Staging Environment Details

The staging site acts as a replica of production to test code before final deployment.
- **Git Branch:** `main` (continuous deployment from commits to `main`).
- **Netlify Site URL:** `https://letsread-api-staging.netlify.app`
- **Database:** MongoDB Atlas Staging cluster database.

### Production Environment Details

The production site hosts the live backend serving active app clients.
- **Git Branch:** Production releases can be configured via a dedicated `production` branch or deployed manually.
- **Netlify Site URL:** `https://letsread-api.netlify.app`
- **Database:** MongoDB Atlas Production cluster database (with high availability and backups enabled).

---

## 🔐 Credentials & Environment Variables

Never commit credentials to Git. Add the following environment variables directly in your **Netlify Team Dashboard** under **Site settings > Environment variables**:

| Variable | Staging Value | Production Value |
|----------|---------------|------------------|
| `MONGO_URI` | `mongodb+srv://staging-user:pass@letsread-stage.mongodb.net/db` | `mongodb+srv://prod-user:pass@letsread-prod.mongodb.net/db` |
| `JWT_SECRET`| `staging_secret_key_123` | `high_entropy_cryptographic_production_secret_key` |
| `PORT` | `5000` | `5000` |

---

## 🚀 How to Deploy

### Method 1: Git-Backed Deployment (Recommended)
1. Link your GitHub repository to your Netlify sites.
2. Configure **Staging** to build from the `main` branch.
3. Configure **Production** to build from the `production` branch or triggers on Git tags.
4. Pushing code to these branches triggers automated deployments.

### Method 2: Manual CLI Deployment
If you need to deploy directly from the command line, you can use the `netlify-cli` package.

#### 1. Login to Netlify:
```bash
npx netlify login
```
This opens a browser page asking you to authenticate.

#### 2. Link your Project:
```bash
npx netlify init
```
Select "Link this directory to an existing site" and pick your target site (Staging or Production).

#### 3. Deploy to Staging:
To deploy a draft version (staging) for testing:
```bash
npx netlify deploy
```
This generates a unique draft URL to test your endpoints.

#### 4. Deploy to Production:
To deploy the active version to the live URL:
```bash
npx netlify deploy --prod
```
*Note:* This command builds and pushes the site live. In `package.json`, this is aliased to `npm run build`:
```bash
npm run build
```

---

## 🪵 Accessing Server Logs

Since there is no persistent VM, logs are streamed in real time.
1. Open your Netlify Dashboard.
2. Select your site.
3. Go to **Logs > Functions** (or **Site sessions > Functions**).
4. Click on the `app` function.
5. You will see real-time execution outputs (e.g. logs from `console.log('MongoDB connected')` and request errors).
