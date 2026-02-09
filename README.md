## MiniShop

Simple full‑stack mini shop application with a Node/Express backend and a React + Vite frontend.

### Tech Stack
- Backend: Node.js, Express, MongoDB (via Mongoose)
- Frontend: React, Vite
- Containerization: Docker, Docker Compose

### Project Structure
- backend/ – Express API (products, cart) and MongoDB connection
- frontend/ – React SPA for browsing products and managing the cart
- docker-compose.yml – Docker Compose definition for the backend service

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)
- Docker and Docker Compose (for containerized backend)

### 1. Backend Setup (without Docker)
1. Go to the backend folder:
	- `cd backend`
2. Install dependencies:
	- `npm install`
3. Create a `.env` file in `backend/` with at least:
	- `MONGO_URI=<your-mongodb-connection-string>`
	- (Optional) `PORT=5000`
4. Start the server:
	- `node app.js`
5. The API will be available at:
	- `http://localhost:5000/api/products`
	- `http://localhost:5000/api/cart`

### 2. Frontend Setup
1. Go to the frontend folder:
	- `cd frontend`
2. Install dependencies:
	- `npm install`
3. Start the dev server:
	- `npm run dev`
4. Open the URL shown in the terminal (by default `http://localhost:5173`).

### 3. Running the Backend with Docker
1. Ensure `backend/.env` exists and contains a valid `MONGO_URI`.
2. From the repository root, build and start the backend container:
	- `docker compose up --build -d`
	- (If you use the legacy CLI: `docker-compose up --build -d`)
3. The backend will run inside the container on port `5000`, mapped to `4000` on your host:
	- Host URL: `http://localhost:4000`
	- Example endpoints:
	  - `http://localhost:4000/api/products`
	  - `http://localhost:4000/api/cart`

You can still run the frontend locally (section 2) and point it to the Dockerized backend at `http://localhost:4000`.

### 4. Stopping and Cleaning Up (Docker)
- Stop containers (keep images):
  - `docker compose down`
- Stop and remove containers, images, and networks:
  - `docker compose down --rmi local --volumes`

### 5. Troubleshooting
- If the backend container exits immediately, check:
  - That `backend/.env` is present and `MONGO_URI` is valid.
  - Container logs via `docker logs minishop-backend`.