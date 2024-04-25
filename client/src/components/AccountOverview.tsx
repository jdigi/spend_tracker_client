import { useAccountDetails } from "../hooks/useAccountDetails";
import { TransactionList } from "./TransactionList";
import { useNavigate } from "react-router";
import { IconComponent } from "../util/IconComponent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AccountDetail = () => {
  const { accountDetails, isLoading } = useAccountDetails();
  const navigate = useNavigate();

  const handleEditAccountRoute = (accountId: string) => {
    navigate(`/account/edit/${accountId}`);
  };

  // * assuming amount is in USD
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  if (!accountDetails) {
    return <div>No account data available.</div>;
  }

  return (
    <div className="w-[640px] mx-auto">
      <section className="grid grid-cols-5">
        <header className="col-span-5">
          <h1>Account Detail</h1>
        </header>
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : accountDetails.account_type ? (
            <IconComponent category={accountDetails.account_type} />
          ) : null}
          {/* {accountDetails.logo_url && (
            <img
              src={accountDetails.logo_url}
              alt={accountDetails.account_name}
              style={{ display: isLoading ? "none" : undefined }}
            />
          )} */}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-2 row-span-1">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            accountDetails.account_name
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-3 row-end-3 row-span-1">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            accountDetails.account_type
          )}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(accountDetails.balance)
          )}
        </div>
      </section>
      <section>
        <header>
          <h2>Transactions</h2>
        </header>
        <TransactionList />
      </section>
      <section>
        <header>
          <h2>Edit Account</h2>
        </header>
        <button onClick={handleEditAccountRoute.bind(null, accountDetails._id)}>
          Edit Account
        </button>
      </section>
    </div>
  );
};
