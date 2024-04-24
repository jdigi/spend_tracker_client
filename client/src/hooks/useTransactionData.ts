import { useEffect, useState } from "react";

// ! real world: use accountId to fetch transactions for a specific account
export const useTransactionData = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // fetch transaction data
    const getTransactionData = async () => {
      setIsLoading(true);
      // TODO: update API to connect accountId to transactions
      // ! real world: use accountId to fetch transactions for a specific account
      // const response = await fetch(`http://localhost:5050/transaction/${accountId}`);

      const response = await fetch(`http://localhost:5050/transaction/`);
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      const data = await response.json();
      if (!data) {
        console.warn(`No data found in response.`);
        return;
      }
      setTransactionData(data);
      setIsLoading(false);
    };
    getTransactionData();
  }, [transactionData.length]);

  // return transaction data
  return { transactionData, isLoading };
};
