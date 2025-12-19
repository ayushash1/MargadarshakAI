from fastapi.testclient import TestClient
from main import app
import json

client = TestClient(app)

def test_recommendation():
    print("\n--- Testing Recommendation API ---")
    
    # Sample Data
    payload = {
        "student": {
            "id": "s1",
            "skills": ["Python", "Machine Learning", "FastAPI"],
            "interests": ["AI", "Data Science"],
            "education": "B.Tech Computer Science",
            "description": "Aspiring AI engineer with experience in Python and Deep Learning."
        },
        "internships": [
            {
                "id": "i1",
                "title": "Frontend Developer",
                "company": "WebTech",
                "requiredSkills": ["React", "CSS", "JavaScript"],
                "description": "Build responsive websites."
            },
            {
                "id": "i2",
                "title": "AI Researcher",
                "company": "DeepMind",
                "requiredSkills": ["Python", "TensorFlow", "NLP"],
                "description": "Work on cutting-edge NLP models."
            },
            {
                "id": "i3",
                "title": "Data Analyst",
                "company": "DataCorp",
                "requiredSkills": ["Excel", "SQL", "Tableau"],
                "description": "Analyze business data."
            }
        ]
    }

    print("Sending payload...")
    response = client.post("/recommend", json=payload)
    
    if response.status_code == 200:
        results = response.json()
        print("\nSuccess! Results:")
        for res in results:
            print(f"ID: {res['internship_id']}, Score: {res['score']:.4f}")
        
        # Validation
        top_match = results[0]['internship_id']
        if top_match == "i2":
            print("\nPASSED: AI Researcher is the top match as expected.")
        else:
            print(f"\nFAILED: Expected 'i2' to be top match, but got '{top_match}'.")
    else:
        print(f"\nError {response.status_code}: {response.text}")

if __name__ == "__main__":
    test_recommendation()
