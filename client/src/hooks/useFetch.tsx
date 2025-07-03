import { useState, useEffect } from 'react';

export default function useFetch<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    async function fetchData() {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            "We couldn't request the data, please try again later"
          );
        }
        const data: T = await response.json();

        setData(data);
      } catch (error: any) {
        setError(error.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, loading, error };
}
