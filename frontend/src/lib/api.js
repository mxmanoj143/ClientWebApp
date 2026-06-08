import axios from "axios";

// Relative path — works on:
//   • Vercel (serverless functions live at same origin under /api/*)
//   • Emergent preview (ingress routes /api/* to the FastAPI backend)
// No env var dependency; site is fully portable.
export const API = "/api";

export const apiClient = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitContact = (data) => apiClient.post("/contact", data).then((r) => r.data);
export const submitQuote = (data) => apiClient.post("/quote", data).then((r) => r.data);
export const submitCareer = (data) => apiClient.post("/career", data).then((r) => r.data);
