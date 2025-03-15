import BASE_URL from "../config";

export const fetchDestinations = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/destinations`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return [];
  }
};
