import { addToast, Button } from '@heroui/react';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

export default function useFetch<T>(
  url: string,
  options?: RequestInit
): {
  data: T | any;
  setData: React.Dispatch<React.SetStateAction<T | undefined>>;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
} {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

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
    } catch (e: any) {
      setError(e.message);
      addToast({
        title: 'Error',
        description: e.message,
        color: 'danger',
        timeout: 10000,
        endContent: (
          <Button
            size="sm"
            variant="flat"
            onPress={() => navigate(location.pathname)}
          >
            Reload
          </Button>
        )
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, setData, loading, error, refetch: fetchData };
}
