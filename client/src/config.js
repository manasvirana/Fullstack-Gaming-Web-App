const API_BASE_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_PROD_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL;

export default API_BASE_URL;
