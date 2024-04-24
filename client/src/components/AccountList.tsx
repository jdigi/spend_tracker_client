import { useNavigate } from "react-router";
import { useAccountData } from "../hooks/useAccountData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Account {
  _id: string;
  account_name: string;
  account_type: string;
  balance: number;
  logo_url: string;
}

export const AccountList = () => {
  const { accountData, isLoading } = useAccountData();
  const navigate = useNavigate();

  // * assuming amount is in USD
  // TODO: seperate into utility function for reuse + add locale support
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  const handlePageChange = (accountId: string) => {
    navigate(`/account/${accountId}`);
  };

  const accountRow = (account: Account) => {
    const {
      _id,
      account_name,
      account_type,
      balance,
      logo_url = "https://jasondigiacobbe.com/logo-react.png",
    } = account;

    return (
      <div
        key={_id}
        className="grid grid-cols-[20%_minmax(20%,_1fr)_20%] gap-y-1 cursor-pointer hover:bg-gray-100 p-2"
        onClick={handlePageChange.bind(null, _id)}
      >
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? <Skeleton width={50} height={50} /> : null}
          {logo_url && (
            <img
              src={logo_url}
              alt={account_name}
              style={{ display: isLoading ? "none" : undefined }}
            />
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 row-span-1">
          {isLoading ? <Skeleton width={100} height={20} /> : account_name}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-3 row-span-1">
          {isLoading ? <Skeleton width={100} height={20} /> : account_type}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(balance)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-[640px] mx-auto">
      {accountData.map((account: Account) => accountRow(account))}
    </div>
  );
};