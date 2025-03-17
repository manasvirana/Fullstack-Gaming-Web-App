// src/config.js
const API_BASE_URL = process.env.NODE_ENV === "production" 
  ? "https://fullstack-gaming-web-app-production.up.railway.app/api/destinations"
  : "http://localhost:5000/api/destinations";

export default API_BASE_URL;