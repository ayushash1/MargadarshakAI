# Margadarshak AI

Margadarshak AI is an intelligent internship platform designed to connect students with opportunities that match their skills and interests using machine learning.

**Live Application:** [https://margadarshak-ai.vercel.app](https://margadarshak-ai.vercel.app)

## Architecture

The application is built using a modern microservices-inspired architecture:

- **Frontend:** React + Vite (User Interface)
- **Backend:** Node.js + Express (API & Business Logic)
- **Database:** MongoDB (Data Persistence)
- **ML Service:** Python + FastAPI (Recommendation Engine)

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.8+)
- MongoDB (Local or Atlas URI)

### Installation & Running

#### 1. Backend

Navigate to the backend directory, install dependencies, and start the server:

```bash
cd backend
npm install
npm start
```

The backend runs on `http://localhost:5000` (default).

#### 2. Frontend

Navigate to the frontend directory, install dependencies, and run the development server:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

#### 3. ML Service

Navigate to the ML service directory, set up a virtual environment, and run the service:

```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The ML service runs on `http://localhost:8000`.

## Features

- **Student Dashboard:** View and apply for internships.
- **Admin Dashboard:** Post and manage internships.
- **Smart Recommendations:** Powered by SBERT embeddings to match students with relevant roles.
[https://margadarshak-ai.vercel.app]([url](https://margadarshak-ai.vercel.app))
