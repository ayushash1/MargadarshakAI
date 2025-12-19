# Internship Recommendation API

Simple Express + MongoDB backend (with mock fallbacks) for experimenting with internship discovery and recommendations.

## Features

- ES module Express server with `express.json()` + `morgan` logging
- MongoDB connection via Mongoose (optional – mock data if unavailable)
- Basic auth + internship endpoints with recommendation helper
- Lightweight in-memory mock data to keep the API working offline

## Getting Started

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Environment variables

| Key | Description |
| --- | --- |
| `MONGODB_URI` | Mongo connection string. If omitted, controllers use mock JSON. |
| `PORT` | Server port. Defaults to `4000`. |
| `DEFAULT_ROLE` | Default role to assign during registration. |

## Available Scripts

- `npm run dev` – Start via nodemon for local development.
- `npm start` – Production start with Node.
- `npm run lint` – Run ESLint (config inherited from repo root if present).

## API Reference

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register a new student/admin. |
| `POST` | `/api/auth/login` | Fake login using `email` + `role`. |
| `GET` | `/api/internships` | List internships. |
| `POST` | `/api/internships` | Create internship (no validation). |
| `GET` | `/api/internships/recommend/:userId` | Mock recommendations for a user. |

### Example Requests & Responses

<details>
<summary>Register</summary>

**Request**

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "Nova Lee",
  "email": "nova@example.com",
  "password": "123456",
  "role": "student",
  "skills": ["React", "Node.js"],
  "interests": ["Frontend"]
}
```

**Response (mock)**

```json
{
  "message": "User registered (mock)",
  "user": {
    "_id": "mock-1733078400000",
    "name": "Nova Lee",
    "email": "nova@example.com",
    "password": "123456",
    "role": "student",
    "skills": ["React", "Node.js"],
    "interests": ["Frontend"]
  }
}
```
</details>

<details>
<summary>Login</summary>

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "asha@example.com",
  "role": "student"
}
```

**Response**

```json
{
  "message": "Login successful (mock)",
  "user": {
    "_id": "u1",
    "name": "Asha Kumar",
    "email": "asha@example.com",
    "role": "student",
    "skills": ["React", "Node.js", "MongoDB"],
    "interests": ["Frontend", "AI"]
  }
}
```
</details>

<details>
<summary>Get Internships</summary>

```http
GET /api/internships
```

**Response**

```json
{
  "data": [
    {
      "_id": "i1",
      "title": "Frontend Intern",
      "company": "Pixel Labs",
      "location": "Remote",
      "requiredSkills": ["React", "CSS"],
      "description": "Work with senior engineers to ship UI components."
    }
  ]
}
```
</details>

<details>
<summary>Create Internship</summary>

```http
POST /api/internships
Content-Type: application/json

{
  "title": "ML Intern",
  "company": "Visionary AI",
  "location": "Remote",
  "requiredSkills": ["Python", "TensorFlow"],
  "description": "Prototype computer vision features."
}
```

**Response**

```json
{
  "message": "Internship stored (mock)",
  "internship": {
    "_id": "mock-1733078400001",
    "title": "ML Intern",
    "company": "Visionary AI",
    "location": "Remote",
    "requiredSkills": ["Python", "TensorFlow"],
    "description": "Prototype computer vision features."
  }
}
```
</details>

<details>
<summary>Recommendations</summary>

```http
GET /api/internships/recommend/u1
```

**Response**

```json
{
  "data": [
    {
      "_id": "i1",
      "title": "Frontend Intern",
      "company": "Pixel Labs",
      "requiredSkills": ["React", "CSS"]
    },
    {
      "_id": "i3",
      "title": "Backend Intern",
      "company": "CloudForge",
      "requiredSkills": ["Node.js", "MongoDB"]
    }
  ]
}
```
</details>

## Postman / API Testing Tips

- Import the collection by clicking *Import → Raw text* and paste the example requests above.
- Set a Postman environment variable `base_url` = `http://localhost:4000`.
- Use `{{base_url}}/api/...` in each request to switch between local/staging quickly.
- Toggle between mock and real DB by setting or clearing `MONGODB_URI` in your `.env`.

## Front-end Integration Snippet

```js
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:4000/api' });

export const fetchInternships = async () => {
  const { data } = await api.get('/internships');
  return data.data;
};

export const login = async (email, role) => {
  const { data } = await api.post('/auth/login', { email, role });
  return data.user;
};
```

## Suggested Next Upgrades

1. **JWT + Password Hashing** – Add bcrypt during registration/login and mint JWTs with refresh tokens.
2. **File Uploads** – Allow students to upload resumes (Multer + S3/Cloudinary).
3. **AI Recommendation Module** – Feed profiles and internship text into an embedding or LLM scoring service, cache scores, and expose an `/api/internships/ai-recommendations` route.
4. **Admin Dashboard Hooks** – Role-based middleware plus CRUD analytics endpoints.

## Connecting an AI Module Later

- Create a utility (e.g., `ai/recommendationClient.js`) that calls an LLM endpoint or local model.
- Pass serialized student profile and job posting data, retrieve relevance scores, and merge with the current rule-based engine for hybrid results.
- Cache responses keyed by `userId + internshipId` to avoid repeated LLM calls.

---

Need help? Open an issue or ping the team. Happy prototyping!

