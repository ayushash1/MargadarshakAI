# Margadarshak ML Service

This is the machine learning microservice for Margadarshak AI. It provides intelligent internship recommendations by calculating semantic similarity between student profiles and internship descriptions.

## Tech Stack

- **Framework:** FastAPI
- **Model:** Sentence-Transformers (`all-MiniLM-L6-v2`)
- **Runtime:** Python 3.8+

## Setup

1. **Create a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

2. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Service**
   ```bash
   python main.py
   # OR directly with uvicorn
   uvicorn main:app --reload
   ```
   The service will start on `http://0.0.0.0:8000`.

## API Endpoints

### `GET /`

Health check endpoint.

- **Response:** `{"status": "ok", "service": "ml-service"}`

### `POST /recommend`

Generates ranked recommendations for a student based on a list of available internships.

**Request Body:**

```json
{
  "student": {
    "id": "student_1",
    "skills": ["python", "react"],
    "interests": ["ai", "web dev"],
    "education": "B.Tech CS",
    "description": "Passionate developer"
  },
  "internships": [
    {
      "id": "internship_1",
      "title": "Frontend Developer",
      "company": "TechCorp",
      "requiredSkills": ["react", "css"],
      "description": "Build user interfaces"
    }
  ]
}
```

**Response:**
Returns a list of internships sorted by relevance score (Cosine Similarity).

```json
[
  {
    "internship_id": "internship_1",
    "score": 0.85
  }
]
```
