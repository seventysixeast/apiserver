# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Comprehensive developer documentation (`README.md`, setup, deployment, architecture, etc.) under `/docs` folder.
- Template environment configuration file `.env.example`.
- Project contribution instructions `CONTRIBUTING.md`.

---

## [1.0.0] - 2026-07-16

### Added
- Core Express application handler in `functions/app.js` with serverless routing via `serverless-http`.
- Database schemas for `User` and `Book` models under `models/`.
- Local seeding script `seed.js` to populate mock catalog and initial user profiles.
- Netlify configuration `netlify.toml` for hosting serverless functions.
- Essential NPM scripts and dependencies including `mongoose`, `cors`, and `netlify-cli`.
