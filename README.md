# 🚀 PrepStack

A monorepo for a personal placement preparation tracker.

The repository includes a React + Vite frontend and a backend scaffold (dependencies present). The client ships with authentication context, protected routes, and pages for dashboard logs, goals, and company checklists. It expects a REST API at `/api` (proxied to `http://localhost:5000`).

## 🧰 Tech Stack

- **Client**
  - ⚛️ React 19, 🧭 React Router 7
  - ⚡ Vite 7
  - 🎨 Tailwind CSS 4 + DaisyUI
  - 🔗 Axios
  - 🎞️ Framer Motion, 🧩 Lucide React
- **Server** (scaffolded; implement app entrypoint)
  - 🟢 Node.js, 🚏 Express
  - 🗄️ Mongoose (MongoDB)
  - 🔐 JSON Web Tokens (jsonwebtoken)
  - 🧂 bcryptjs, 🌐 cors, 📝 morgan

## 📦 Repository Structure

```
PrepStack/
  client/                # React + Vite app
    src/
      components/        # UI components (Navbar, ProtectedRoute, etc.)
      contexts/          # AuthContext (localStorage token + /auth/me)
      pages/             # Landing, Login, Dashboard, Goals, Checklists
      utils/api.js       # Axios baseURL '/api' + x-auth-token header
    vite.config.js       # Proxies '/api' -> http://localhost:5000
  server/                # Backend deps present; implement Express app here
```

## ✅ Prerequisites

- Node.js 18+ (LTS recommended)
- npm 8+
- MongoDB instance (local or hosted) for the server

## ⚡ Quick Start

### 🖥️ Client (frontend)

```
cd client
npm install
npm run dev
```

- Dev server: `http://localhost:5173` (default Vite port)
- API requests are proxied: `/api/*` → `http://localhost:5000/*`

Client scripts:

- `npm run dev` — Start Vite dev server
/- `npm run build` — Production build
- `npm run preview` — Preview the production build
- `npm run lint` — Run ESLint

### 🛠️ Server (backend)

The `server` folder includes dependencies but no entrypoint yet. Add an Express app (e.g., `server.js`) and implement the routes expected by the client.

Install dependencies:

```
cd server
npm install
```

Create a `.env` file in `server/`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Implement an Express server that:

- Listens on `process.env.PORT || 5000`
- Connects to MongoDB using `MONGO_URI`
- Uses `cors`, `morgan`, `express.json()`
- Serves routes under `/api`
- Validates JWT from the `x-auth-token` header

Minimal route expectations from the client code:

- `GET /api/auth/me` — Return current user (requires valid JWT)
- `GET /api/logs` — List logs for the authenticated user
- `DELETE /api/logs/:id` — Delete a log
- `GET /api/goals` — List goals
- `GET /api/checklists` — List checklists
- `POST /api/checklists` — Create a checklist

Note: The login flow should return a JWT that the client stores in `localStorage` under `token`.

## 🔑 Client Auth & Routing

- `src/contexts/AuthContext.jsx`
  - Loads JWT from `localStorage`
  - Calls `GET /api/auth/me` to fetch the user
  - Exposes `login(token)`, `logout()` and `user`
- `src/components/ProtectedRoute.jsx`
  - Redirects to `/login` if not authenticated
- Main routes (`src/App.jsx`):
  - Public: `/` (Landing), `/login`
  - Protected (wrapped in `ProtectedRoute`): `/dashboard`, `/goals`, `/checklists`

## 🧹 Linting

- ESLint is configured in the client. Run `npm run lint` from `client/`.

## ⚙️ Environment & Configuration

- Client: Axios baseURL is `/api` and the Vite dev server proxies to `http://localhost:5000`.
- Server: Use a `.env` file in `server/` as shown above.

## 🏗️ Build & Preview (Client)

```
cd client
npm run build
npm run preview
```

## 📝 Notes

- Favicon is referenced in `client/index.html` as `/Icon.png`. Ensure it exists in `client/public/` or update the path.
- Tailwind CSS 4 and DaisyUI are configured via `client/src/index.css` and Vite plugins.

## 🗺️ Roadmap

- Implement backend Express app with authentication and resources for logs, goals, and checklists
- Add tests for both client and server
- CI/CD and deployment docs

## 📄 License

MIT
