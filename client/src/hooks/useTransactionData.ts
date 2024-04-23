import { useEffect, useState } from "react";

// ! would use accountId: string to fetch transactions for a specific account
export const useTransactionData = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    // fetch transaction data
    const getTransactionData = async () => {
      // TODO: update API to connect accountId to transactions
      // ! would use accountId to fetch transactions for a specific account
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
    };
    getTransactionData();
  }, [transactionData.length]);

  // return transaction data
  return transactionData;
};
