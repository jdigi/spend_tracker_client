import { useTransactionData } from "../hooks/useTransactionData";
import { IconComponent } from "../util/IconComponent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Transaction {
  account_id: string;
  amount: number;
  date: string;
  category: string;
  merchant_name: string;
  category_icon_url?: string;
}

export const TransactionList = () => {
  const { transactionData, isLoading } = useTransactionData();

  // * assuming amount is in USD
  // TODO: seperate into utility function for reuse + add locale support
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  // simple date formatting
  // TODO: seperate into utility function for reuse
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(dateObj);
  };

  const transactionRow = (transaction: Transaction) => {
    // destructuring transaction object && setting default values
    const {
      account_id,
      amount,
      date,
      merchant_name,
      category,
      category_icon_url = "https://jasondigiacobbe.com/logo-react.png",
    } = transaction;

    return (
      <div
        key={account_id}
        className="grid grid-cols-[20%_minmax(20%,_1fr)_20%] gap-y-1"
      >
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : (
            <IconComponent category={category} />
          )}
          {/* <img
            src={category_icon_url}
            alt={transaction.category}
            style={{ display: isLoading ? "none" : undefined }}
          /> */}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 row-span-1">
          {isLoading ? <Skeleton width={100} height={20} /> : merchant_name}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-3 row-span-1">
          {isLoading ? <Skeleton width={100} height={20} /> : formatDate(date)}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(amount)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[640px] mx-auto">
      {transactionData.map((transaction: Transaction) =>
        transactionRow(transaction)
      )}
    </div>
  );
};
