import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Account = {
  _id: string;
  account_name: string;
  account_type: string;
  balance: number;
  logo_url: string;
};

export const useAccountData = () => {
  const [accountData, setAccountData] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    const getAccountData = async () => {
      setIsLoading(true);

      // optional accountId to fetch specific account
      const accountId = routeParams.id?.toString() || undefined;
      let url = `http://localhost:5050/account/`;
      if (accountId) {
        url += accountId;
      }

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
        setAccountData(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAccountData();
  }, [accountData.length, routeParams.id]);
  return { accountData, isLoading };
};
