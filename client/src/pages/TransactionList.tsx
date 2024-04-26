import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { TransactionEntry } from "../components/TransactionEntry";
import { SortUtility } from "../components/SortUtility";

interface TransactionProps {
  date: string;
  _id: string;
  merchant_name: string;
  category: string;
  category_icon_url: string;
  amount: number;
}

// ! This component is not complete. Use for sorting reference only.

export const TransactionList = () => {
  const [transactions, setTransactions] = useState([] as TransactionProps[]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch jobs
    async function getTransactions() {
      const response = await fetch("http://localhost:5050/transaction/");
      // check for errors
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      // set jobs state with data from response via await
      const data = await response.json();
      // setJobs(data);
      // sort jobs by date in ascending order by default
      setTransactions(sortDataByPropertyName(data, "date", "asc"));
    }
    // call getTransactions function
    getTransactions();
  }, [transactions.length]); // if jobs.length changes, refetch data

  const sortDataByPropertyName = (
    data: TransactionProps[],
    key: keyof TransactionProps,
    order: "asc" | "desc" = "asc"
  ) => {
    // use ... spread operator to (shallow) copy the data array
    // this helps ensure React recognizes the state change
    // and triggers a re-render
    const sortedData = [...data].sort((a, b) => {
      // set valueA and valueB to the values of the key property
      let valueA = a[key];
      let valueB = b[key];

      // normalize string values for case insensitive comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      // determine sort order
      let comparison = 0;
      if (valueA < valueB) {
        comparison = -1;
      } else if (valueA > valueB) {
        comparison = 1;
      }

      // reverse the comparison result if order is descending
      return order === "desc" ? comparison * -1 : comparison;
    });
    return sortedData;
  };

  const handleSort = (sortKey: string, sortOrder: string) => {
    const sortedData = sortDataByPropertyName(
      transactions,
      sortKey as keyof TransactionProps,
      sortOrder as "asc" | "desc"
    );
    setTransactions(sortedData);
  };

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "merchant_name", label: "Merchant" },
    { value: "amount", label: "Amount" },
    { value: "category", label: "Category" },
  ];

  // TODO: add pagination

  return (
    <>
      <div className="w-full mx-auto flex justify-center">
        <SortUtility sortOptions={sortOptions} handleSort={handleSort} />
        <div className="w-[800px]">
          <header className="grid grid-cols-9 font-bold text-sm">
            <div className="pl-2 col-span-2">Date</div>
            <div className="col-span-2 pl-2">Merchant</div>
            <div className="col-span-2 pl-2">Category</div>
            <div className="text-center">Amount</div>
            <div className="text-center">Logo</div>
          </header>

          {transactions.map((transaction) => (
            <TransactionEntry key={transaction._id} transaction={transaction} />
          ))}
        </div>
      </div>
    </>
  );
};
