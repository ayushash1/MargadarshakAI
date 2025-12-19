import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sentence_transformers import SentenceTransformer, util
import torch

app = FastAPI(title="Margadarshak ML Service")

# Initialize model (lazy loading or on startup)
# Using 'all-MiniLM-L6-v2' for a good balance of speed and quality
model_name = 'all-MiniLM-L6-v2'
print(f"Loading SBERT model: {model_name}...")
model = SentenceTransformer(model_name)
print("Model loaded successfully.")

class Internship(BaseModel):
    id: str
    title: str
    company: str
    requiredSkills: List[str] = []
    description: Optional[str] = ""

class Student(BaseModel):
    id: str
    skills: List[str] = []
    interests: List[str] = []
    education: Optional[str] = ""
    description: Optional[str] = ""

class RecommendationRequest(BaseModel):
    student: Student
    internships: List[Internship]

class ScoredInternship(BaseModel):
    internship_id: str
    score: float

@app.get("/")
def health_check():
    return {"status": "ok", "service": "ml-service"}    

@app.post("/recommend", response_model=List[ScoredInternship])
def recommend_internships(request: RecommendationRequest):
    try:
        if not request.internships:
            return []

        # 1. Create text representation for Student
        # Combine distinct features into a single semantic string
        student_text = f"{request.student.education} " + \
                       f"{' '.join(request.student.skills)} " + \
                       f"{' '.join(request.student.interests)} " + \
                       f"{request.student.description}"
        
        # 2. Create text representation for Internships
        internship_texts = []
        for i in request.internships:
            text = f"{i.title} {i.company} " + \
                   f"{' '.join(i.requiredSkills)} " + \
                   f"{i.description}"
            internship_texts.append(text)

        # 3. Generate Embeddings
        # Convert to embeddings
        student_emb = model.encode(student_text, convert_to_tensor=True)
        internship_embs = model.encode(internship_texts, convert_to_tensor=True)

        # 4. Calculate Cosine Similarity
        # util.cos_sim returns a matrix, we want the first row (student vs all internships)
        cosine_scores = util.cos_sim(student_emb, internship_embs)[0]

        # 5. Rank and Sort
        recommendations = []
        for idx, score in enumerate(cosine_scores):
            recommendations.append(ScoredInternship(
                internship_id=request.internships[idx].id,
                score=float(score)
            ))
        
        # Sort by score descending
        recommendations.sort(key=lambda x: x.score, reverse=True)

        return recommendations

    except Exception as e:
        print(f"Error processing recommendation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    port = 8000
    print(f"Server listening at port {port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)