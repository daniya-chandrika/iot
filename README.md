
# Hospital Monitoring — Simple Full Project

This is a minimal, ready-to-run project for a **Hospital Monitoring** website (prototype).
It includes a simple **Node.js + Express** backend using SQLite (via `sqlite3`) and a plain **frontend** (HTML/CSS/JS)
that talks to the backend using `fetch`. The project demonstrates:

- Role-based login (Director / Doctor / Patient) — simple username/password from the DB (no production auth).
- Doctors can toggle availability.
- Patients can view doctors and see availability.
- Director can view check-in / check-out logs (doctor in/out).
- Simple API endpoints and a small DB initialization SQL.

> This is a learning prototype. For production you must add:
> - Proper authentication (hashed passwords, sessions or JWT)
> - Input validation & sanitization
> - HTTPS, CORS policies, and security hardening
> - Better UI and error handling

## How to run (backend)

1. Install Node.js (v16+) and npm.
2. Open a terminal inside the `backend` folder:
   ```
   cd backend
   npm install
   node server.js
   ```
3. Initialize the SQLite DB (first run):
   ```
   sqlite3 hospital.db < db_init.sql
   ```
   (If `sqlite3` is not installed, you can run the SQL manually with any SQLite client or use the provided scripts.)

4. Backend will run at: `http://localhost:3000`

## Frontend
Open `frontend/index.html` (or other pages) in a browser. The frontend calls the backend endpoints at `http://localhost:3000`.
If serving from a file and you hit CORS issues, run a simple static server, e.g.:
```
python -m http.server 8000
```
and browse to `http://localhost:8000/frontend/index.html`.

## Project structure (summary)
- backend/
  - server.js — Express server and APIs
  - package.json — dependencies
  - db_init.sql — SQL to create tables + seed data
  - .env.example — environment example
- frontend/
  - index.html — Home / links
  - login.html — Login form (choose role)
  - director.html / doctor.html / patient.html — role pages
  - app.js — frontend JS shared for API calls
  - styles.css — minimal styling

## Notes
This is intentionally simple to be easy to understand and extend. Tell me if you want:
- React + Tailwind frontend version
- JWT authentication + hashed passwords
- WebSocket-based real-time updates
- Dockerfile and docker-compose setup

Enjoy — and tell me if you'd like me to modify the project files or include additional features!
"# iot" 
