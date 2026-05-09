import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const apiClient = axios.create({
  baseURL: API,
  headers: { "Content-Type": "application/json" },
});

export const submitContact = (data) => apiClient.post("/contact", data).then((r) => r.data);
export const submitQuote = (data) => apiClient.post("/quote", data).then((r) => r.data);
export const submitCareer = (data) => apiClient.post("/career", data).then((r) => r.data);
