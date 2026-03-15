# QuickHire — Simple Job Board Application

A full-stack mini job board built with **Next.js** (frontend) and **Node.js / Express** (backend), using **MongoDB** as the database.

---

## Features

| Area | Feature |
|------|---------|
| **Job Listings** | Browse all jobs, search by title/keyword, filter by category & location |
| **Job Detail** | Full job description, breadcrumb navigation |
| **Apply Now** | Modal form with name, email, resume link (URL), and cover note |
| **Admin Panel** | Post new jobs, delete existing jobs — via `/admin` |
| **SSR** | All pages are React Server Components — data fetched on the server |
| **Validation** | Zod validates all API inputs (email format, URL format, required fields) |
| **Responsive** | Fully responsive with Tailwind CSS |

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15 (App Router, RSC), Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | MongoDB (Mongoose) |
| Validation | Zod |

---

## Project Structure

```
qsl-task/
├── client/         # Next.js frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── find-jobs/          # Job listings (SSR)
│   │   │   ├── find-jobs/[id]/     # Job detail (SSR)
│   │   │   └── admin/              # Admin panel (SSR)
│   │   ├── components/
│   │   │   ├── modules/
│   │   │   │   ├── find-jobs/      # Search bar, filters, job list, apply modal
│   │   │   │   ├── admin/          # Jobs table, post job form
│   │   │   │   └── home/           # Home page sections
│   │   │   └── shared/             # Reusable components (Container, etc.)
│   │   └── lib/
│   │       └── api.ts              # Centralised API URL utility
└── server/         # Express backend
    └── src/
        └── app/modules/
            ├── job/                # Job CRUD
            └── application/        # Application submissions
```

---

## API Endpoints

### Jobs
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/jobs` | List all jobs (supports `?searchTerm`, `?category`, `?location`) |
| `GET` | `/api/v1/jobs/:id` | Get a single job |
| `POST` | `/api/v1/jobs` | Create a new job (Admin) |
| `DELETE` | `/api/v1/jobs/:id` | Delete a job (Admin) |

### Applications
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/applications` | Submit a job application |

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)
- npm or pnpm

---

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd qsl-task
```

---

### 2. Backend Setup

```bash
cd server
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env and set DB_URL to your MongoDB connection string

npm run dev
# Server runs on http://localhost:5000
```

**Server `.env` variables:**

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DB_URL` | MongoDB connection string | `mongodb://localhost:27017/quickhire` |
| `NODE_ENV` | Environment | `development` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |

---

### 3. Frontend Setup

```bash
cd client
npm install

# Copy and configure environment variables
cp .env.example .env.local
# Edit .env.local if your backend runs on a different URL

npm run dev
# App runs on http://localhost:3000
```

**Frontend `.env.local` variables:**

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api/v1` |

---

### 4. Open in browser

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Find Jobs | http://localhost:3000/find-jobs |
| Admin Dashboard | http://localhost:3000/admin |
| Post New Job | http://localhost:3000/admin/jobs/new |

---

## Data Models

**Job**
```
id, title, company, location, category, description, createdAt
```

**Application**
```
id, job (ref: Job), name, email, resume_link, cover_note, createdAt
```

---

## Validation Rules

All API endpoints validate input with **Zod**:

- All fields are **required**
- `email` must be a valid email address
- `resume_link` must be a valid URL
- String fields must be non-empty

---

## License

MIT
