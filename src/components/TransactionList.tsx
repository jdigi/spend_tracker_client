import { useAccountData } from "../hooks/useAccountData";
import { IconComponent } from "../util/IconComponent";
import { StringFormatter } from "../util/StringFormatter";
import Skeleton from "react-loading-skeleton";

interface TransactionProps {
  account_id: string;
  amount: number;
  date: string;
  category: string;
  merchant_name: string;
  category_icon_url?: string;
}

export const TransactionList = () => {
  const { data, isLoading, error } = useAccountData<TransactionProps[]>(
    "https://spend-tracker-backend.vercel.app/transaction/"
  );
  // TODO: update API to connect accountId to transactions
  // * real world: use accountId to fetch transactions for a specific account

  const { formatDate, formatCurrency } = StringFormatter();

  // TODO: implement sorting utility

  const transactionRow = (transaction: TransactionProps) => {
    // destructuring transaction object
    const { account_id, amount, date, merchant_name, category } = transaction;

    return (
      <div
        key={account_id}
        className="grid grid-cols-[15%_minmax(20%,_1fr)_20%] gap-y-1 border-b border-slate-300 hover:bg-[#CBE0D950] p-2 py-3 min-h-[70px]"
      >
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : (
            <IconComponent category={category} typeSize={36} />
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 row-span-1 text-base font-semibold">
          {isLoading ? <Skeleton width={100} height={20} /> : merchant_name}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-3 row-span-1 text-sm font-semibold text-slate-400">
          {isLoading ? <Skeleton width={100} height={20} /> : formatDate(date)}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center text-base font-semibold">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(amount)
          )}
        </div>
      </div>
    );
  };

  if (error)
    return (
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold">Error Loading Data:</p>
        <p className="italic">{error}</p>
        <p className="mt-2">Please refresh or try again later.</p>
      </div>
    );

  return (
    <>
      {isLoading || !data ? (
        <Skeleton count={5} height={70} />
      ) : (
        <div className="w-full mx-auto ">
          {data.map((transaction: TransactionProps) =>
            transactionRow(transaction)
          )}
        </div>
      )}
    </>
  );
};
