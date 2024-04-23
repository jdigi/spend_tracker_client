import { useEffect, useState } from "react";

export const useAccountData = () => {
  const [accountData, setAccountData] = useState([]);
  useEffect(() => {
    const getAccountData = async () => {
      const response = await fetch("http://localhost:5050/account/");
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
    };
    getAccountData();
  }, [accountData.length]);
  return accountData;
};
