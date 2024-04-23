import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface TransactionProps {
  date: string;
  _id: string;
  merchant_name: string;
  category: string;
  category_icon_url: string;
  amount: number;
}

interface Transaction {
  transaction: TransactionProps;
}

export const TransactionEntry = ({ transaction }: Transaction) => (
  <div className="job border border-black grid grid-cols-10 mb-2">
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      {transaction.date || <Skeleton />}
    </div>
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      {transaction.merchant_name || <Skeleton />}
    </div>
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      {transaction.category || <Skeleton />}
    </div>
    <div
      className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm"
      style={{
        display: "block",
        lineHeight: 2,
        padding: "1rem",
        width: 100,
      }}
    >
      {transaction.amount || <Skeleton />}
    </div>
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      <img src={transaction.category_icon_url} alt={transaction.category} />
    </div>
  </div>
);
