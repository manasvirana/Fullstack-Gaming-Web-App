import { useEffect, useState } from "react";
import BASE_URL from "../config";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/destinations`);
        const data = await response.json();
        console.log("Fetched Data:", data);
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <h1>Destinations</h1>
      {destinations.length === 0 ? (
        <p>Loading or No Destinations Found</p>
      ) : (
        <ul>
          {destinations.map((destination) => (
            <li key={destination.id}>{destination.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Destinations;
