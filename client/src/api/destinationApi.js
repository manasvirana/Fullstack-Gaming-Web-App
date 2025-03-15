import API_BASE_URL from "../config.jsx";

const fetchDestinations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/destinations`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};
