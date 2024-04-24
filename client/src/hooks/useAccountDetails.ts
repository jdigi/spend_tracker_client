import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useAccountDetails = () => {
  const [accountDetails, setAccountDetails] = useState<{ [key: string]: any }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    const getAccountDetails = async () => {
      setIsLoading(true);

      const accountId = routeParams.id?.toString() || undefined;
      let url = `http://localhost:5050/account/${accountId}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          console.error(message);
          return;
        }
        const data = await response.json();
        // if no data, return
        if (!data) {
          console.warn(`No data found in response.`);
          return;
        }
        setAccountDetails(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAccountDetails();
  }, [routeParams.id]);
  return { accountDetails, isLoading };
};
