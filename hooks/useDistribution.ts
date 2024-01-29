import axios from 'axios';
import { useEffect, useState } from 'react';
import { Miner } from 'utils/common';
import { GEOCODE_API_KEY } from 'utils/constants';

export function useDistribution(miners: Miner[]) {
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState([]);

  // Function to convert IP addresses to coordinates (dummy function, you may need an API)
  const convertIPtoCoordinates = async (ip) => {
    if (ip === '0.0.0.0') return null;
    try {
      const response = await axios.get(
        `https://api.geoapify.com/v1/ipinfo?apiKey=${GEOCODE_API_KEY}&ip=${ip}`
      );

      if (response.data) {
        const { location } = response.data;
        return { lat: location.latitude, lng: location.longitude };
      } else {
        console.error('No results found for IP:', ip);
        return null;
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const newMarkers = [];
      let count = 0;
      setLoading(true);
      for (const miner of miners) {
        const ip = miner.axonInfo.ip;
        const coordinates = await convertIPtoCoordinates(ip);
        if (coordinates) {
          newMarkers.push({
            position: coordinates,
            ip,
            miner: miner,
          });
          count++;
        }
      }
      setMarkers(newMarkers);
      setLoading(false);
    };

    fetchMarkers();
  }, [miners]);

  return { markers, loading };
}
