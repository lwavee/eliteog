# EliteOps Global (EOG) Portal

EliteOps Global (EOG) is an enterprise portal featuring a modern, highly interactive frontend and a robust backend service designed for administrative, agency, and industrial operational management.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Icons:** [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Runtime:** Node.js (TypeScript)

### Backend
- **Framework:** [Express.js](https://expressjs.com/) with TypeScript
- **Database:** [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
- **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/) & [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Utilities:** [Nodemailer](https://nodemailer.com/) (email alerts) & [Multer](https://github.com/expressjs/multer) (file uploads)

---

## 📁 Repository Structure

```text
eliteopsglobal/
├── backend/               # Node.js + Express API Server
│   ├── src/               # TypeScript Source Code
│   │   ├── config/        # Database & Environment configurations
│   │   ├── controllers/   # Route handlers
│   │   ├── middleware/    # Auth & file upload filters
│   │   ├── models/        # Mongoose data schemas
│   │   ├── routes/        # API route endpoints
│   │   └── server.ts      # Application entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/              # Next.js Client Application
│   ├── src/               # React Code base
│   │   ├── app/           # App router page structure
│   │   │   ├── admin/     # Admin-only dashboard & panel
│   │   │   └── industries/# Industry specific routes
│   │   ├── components/    # Reusable UI components (Headers, cards, etc.)
│   │   ├── context/       # React Context (State management)
│   │   └── utils/         # Frontend helpers
│   ├── public/            # Static assets
│   ├── package.json
│   └── next.config.ts
├── docker-compose.yml     # Multi-container local orchestration
├── package.json           # Monorepo root settings
└── README.md              # Main project documentation
```

---

## ⚙️ Configuration & Environment Variables

Create environment configuration files in their respective folders before running the applications.

### 1. Frontend Configuration (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 2. Backend Configuration (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eliteops
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Email Notification setup (e.g., Mailtrap, Gmail)
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
FROM_EMAIL=noreply@eliteopsglobal.com
NOTIFICATION_EMAIL=admin@eliteopsglobal.com

# Allowed CORS client URL
FRONTEND_URL=http://localhost:3000
```

---

## 🛠️ Local Development Setup

You can run the application either directly on your host machine or via Docker.

### Method A: Running Locally (Recommended for Development)

1. **Install Dependencies for both client & server:**
   In the root directory, run:
   ```bash
   npm run install:all
   ```

2. **Start MongoDB:**
   Ensure you have a local MongoDB service running on `mongodb://localhost:27017`.

3. **Run both applications concurrently:**
   From the root folder, run:
   ```bash
   npm run dev
   ```
   - Frontend runs on: [http://localhost:3000](http://localhost:3000)
   - Backend API runs on: [http://localhost:5000](http://localhost:5000)

### Method B: Running via Docker-Compose

To build and spin up the frontend, backend, and MongoDB containerized instances:
```bash
docker-compose up --build
```
This automatically configures network routing and volumes.

---

## 🌐 Production Deployment Guide

### Part 1: Deploying the Frontend on Vercel

Vercel is the premier hosting platform for Next.js applications.

1. **Log in to Vercel:** Go to [Vercel](https://vercel.com/) and link your GitHub account.
2. **Import Project:** Click **Add New** > **Project** and import your repository (`eliteog`).
3. **Configure Project Settings:**
   - **Framework Preset:** Next.js
   - **Root Directory:** Select `frontend` (crucial: do not deploy the whole root folder as the Next.js target directly, set the sub-directory to `frontend`).
4. **Environment Variables:** Add `NEXT_PUBLIC_API_URL` under the Environment Variables section (pointing to your deployed backend URL, e.g., `https://your-backend.onrender.com/api`).
5. **Deploy:** Click **Deploy**. Vercel will build the frontend and provide you with a production URL.

### Part 2: Deploying the Backend API (Render / Railway)

Since the backend is a persistent Express server, it needs to be hosted on a container-capable platform.

#### Option A: Render
1. Go to [Render](https://render.com/) and create a **Web Service**.
2. Connect your GitHub repository.
3. In settings, set:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Add all environment variables from `backend/.env` (especially `MONGODB_URI` pointing to Atlas, and `FRONTEND_URL` pointing to the deployed Vercel URL).

#### Option B: Railway
1. Go to [Railway](https://railway.app/) and create a new project.
2. Deploy from GitHub, and set the **Root Directory** settings to `backend`.
3. Add the environment variables in the variables tab.

### Part 3: Database Hosting (MongoDB Atlas)

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a Free Shared Cluster.
3. Under **Network Access**, whitelist `0.0.0.0/32` (or the IP ranges of Vercel/Render).
4. Create a database user with password access.
5. Retrieve the MongoDB URI connection string and use it as `MONGODB_URI` in your backend server's production settings.

---

## 🔑 Key Features
- **Monorepo Architecture:** Single repository structure with clean division of frontend/backend.
- **Concurrent Development:** Script setup allows spinning up client and API servers with a single command.
- **JWT Protection:** Fully secured endpoint routing using JWT authorizations.
- **Tailwind CSS v4 & Motion Graphics:** Modern UI visuals with high responsiveness.
