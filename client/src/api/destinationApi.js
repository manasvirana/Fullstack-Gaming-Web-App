const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchDestinations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/destinations`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching destinations:", error);
  }
};
