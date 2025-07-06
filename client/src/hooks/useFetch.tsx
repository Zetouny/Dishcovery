import { useState, useEffect } from 'react';

export default function useFetch<T>(
  url: string,
  options?: RequestInit
): {
  data: T | any;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("We couldn't request the data, please try again later");
      }
      const data = await response.json();

      setData(data);
    } catch (error: any) {
      setError(error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}
