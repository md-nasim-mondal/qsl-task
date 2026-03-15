# QuickHire — Premium Job Board Platform

QuickHire is a modern, high-performance job board platform built with **Next.js 15**, **Express**, and **MongoDB**. It features a stateless, purely JWT-based authentication system, comprehensive Role-Based Access Control (RBAC), and a premium, responsive UI/UX.

---

## 🚀 Key Features

### 👤 Candidate Features
- **Stateless Authentication**: Purely JWT-driven login/signup for better scalability.
- **Job Search**: Advanced search by keywords, categories, and locations.
- **Application Tracking**: Dedicated dashboard to track status of all applied jobs.
- **Premium Profile**: Manage personal profiles and uploaded resumes.
- **One-Application Rule**: Prevents candidates from applying to the same job twice.

### 🏢 Admin & Management
- **Centralized Dashboard**: Manage jobs, users, and applications from a secure panel.
- **Detailed Analytics**: Real-time stats on open jobs and total applicants.
- **User Management**: Unified table to activate, block, or delete users.
- **Self-Protection**: Advanced safeguards preventing admins from modifying super-admins or deleting their own accounts.
- **Role Control**: Admins can manage candidates, while super-admins have full authority.

### 🛠️ Technical Highlights
- **Stateless Architecture**: Removed all session-based dependencies for a modern API footprint.
- **Local Storage Survival**: Migrated from Cloudinary to reliable local disk storage for uploads.
- **Automated Builds**: Custom scripts for production-ready template synchronization.
- **Robust Validation**: Zod-powered schema validation for all endpoints.
- **Mocked Utilities**: Email utility mocked for development stability without external SMTP.

---

## 💻 Tech Stack

- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Axios, React Context API.
- **Backend**: Node.js, Express.js, TypeScript, Passport.js (Local Strategy), JWT.
- **Database**: MongoDB (Mongoose), QueryBuilder for advanced filtering.
- **Validation**: Zod (Backend), React Hook Form (Frontend).

---

## 🛠️ Setup & Installation

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **MongoDB**: local instance or Atlas URI

### 2. Backend Setup
```bash
cd server
npm install
cp .env.example .env
# Configure your DB_URL and JWT secrets in .env
npm run dev
```

### 3. Frontend Setup
```bash
cd client
pnpm install
# Configure NEXT_PUBLIC_API_URL in .env.local if needed
pnpm run dev
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | `admin@demo.com` | `password123` |
| **Candidate** | `user@demo.com` | `password123` |

---

## 📁 Project Structure

```bash
qsl-task/
├── client/             # Next.js 15 Frontend
│   └── src/
│       ├── app/        # Dashboard & App Router pages
│       ├── components/ # Atomic UI components & Modules
│       └── lib/        # API utilities & helpers
└── server/             # Express.js Backend
    └── src/
        └── app/
            ├── config/ # Environment & Auth configs
            ├── modules/# Feature-based modular architecture
            └── utils/  # Reusable logic & patterns
```

---

## 📜 License
This project is licensed under the MIT License.
