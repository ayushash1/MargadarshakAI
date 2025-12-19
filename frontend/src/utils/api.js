// Simple API client to talk to the Margdarshak AI backend.
// Uses Vite env variable so you can easily change the backend URL.

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  return response.json();
}

// ---------- Auth ----------

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

export async function registerUser(payload) {
  const res = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// ---------- Internships ----------

export async function fetchInternships() {
  const res = await fetch(`${BASE_URL}/api/internships`);
  const data = await handleResponse(res);
  // backend returns { data: [...] }
  return data.data || [];
}

export async function createInternship(internship) {
  const res = await fetch(`${BASE_URL}/api/internships`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(internship),
  });
  return handleResponse(res);
}

export async function deleteInternship(id) {
  const res = await fetch(`${BASE_URL}/api/internships/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}

export async function updateInternship(id, internship) {
  const res = await fetch(`${BASE_URL}/api/internships/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(internship),
  });
  return handleResponse(res);
}

export async function fetchRecommendations(userId) {
  const res = await fetch(`${BASE_URL}/api/internships/recommend/${userId}`);
  const data = await handleResponse(res);
  return data.data || [];
}

export async function applyForInternship(internshipId, userId) {
  const res = await fetch(`${BASE_URL}/api/internships/${internshipId}/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return handleResponse(res);
}

export async function fetchUserProfile(id) {
  const res = await fetch(`${BASE_URL}/api/auth/profile/${id}`, {
    method: "GET",
  });
  return handleResponse(res);
}

export async function updateUserProfile(id, userData) {
  const res = await fetch(`${BASE_URL}/api/auth/profile/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
}

export async function fetchApplications() {
  const res = await fetch(`${BASE_URL}/api/internships/applications`);
  const data = await handleResponse(res);
  return data.data || [];
}
