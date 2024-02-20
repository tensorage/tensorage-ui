import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_STATS } from 'utils/constants';
import { transformChunk, transformStats } from 'utils/transformer';
import { Chunk, StatsChartItem } from 'utils/common';

export function useStats() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatsChartItem[] | []>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_STATS}`);

        if (response.data) {
          const chunkData: Chunk[] = Object.keys(response.data).map(
            (key: string) => {
              return transformChunk(key, response.data[key]);
            }
          );
          const chartData: StatsChartItem[] = transformStats(chunkData);
          setData(chartData);
        }

        // Assuming the response.data contains the fetched data
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { loading, data, error };
}
