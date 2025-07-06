import { useState, useEffect, useCallback } from 'react';

export default function useFetch<T>(
  url: string,
  options?: RequestInit
): {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => {};
} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error("We couldn't request the data, please try again later");
      }
      const data: T = await response.json();

      setData(data);
    } catch (error: any) {
      setError(error.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
