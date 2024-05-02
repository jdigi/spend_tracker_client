import { useEffect, useState } from "react";

interface DataResponse<T> {
  data: T | null; // generic type T or null
  isLoading: boolean;
  error: string | null;
}

export const useAccountData = <T>(url: string): DataResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAccountData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`An error has occured: ${response.status}`);
      }
      const result = await response.json();
      if (!result) {
        console.warn(`No data found in response.`);
      }
      setData(result);
    } catch (error: any) {
      console.error(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAccountData();
  }, [url]);
  return { data, isLoading, error };
};
