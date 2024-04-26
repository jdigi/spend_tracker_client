import { useAccountDetails } from "../hooks/useAccountDetails";
import { motion } from "framer-motion";
import { TransactionList } from "./TransactionList";
import { useNavigate } from "react-router";
import { IconComponent } from "../util/IconComponent";
import { Edit } from "@mui/icons-material";
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
    return (
      <div className="max-w-screen-xl w-full p-4 mx-auto h-full">
        No Account data available.
      </div>
    );
  }

  return (
    <motion.main
      className="max-w-screen-xl w-full p-4 mx-auto h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="w-full py-4 border-b border-t border-slate-300 flex items-center">
        <img
          src="https://empower.me/static/icon-empower-trademark.f9c0947b.svg"
          alt="Empower Logo"
          className="invert w-10 h-10 mr-4"
        />
        <h1 className="text-3xl font-light">Account Details</h1>
      </header>
      <section className="grid grid-cols-5 w-full py-8 border-b border-slate-300">
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : accountDetails.account_type ? (
            <div className="flex items-center justify-center p-4 rounded-full border-2 border-black">
              <IconComponent
                category={accountDetails.account_type}
                typeSize={72}
              />
            </div>
          ) : null}
        </div>
        <div className="col-start-2 col-end-5 row-start-1 row-end-2 row-span-1 text-3xl font-semibold self-end">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            accountDetails.account_name
          )}
        </div>
        <div className="col-start-2 col-end-5 row-start-2 row-end-3 row-span-1 text-lg font-normal text-slate-400">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            accountDetails.account_type
          )}
        </div>
        <div className="col-start-5 col-end-6 row-span-2 self-center text-3xl font-black">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(accountDetails.balance)
          )}
        </div>
      </section>
      <section className="max-w-screen-lg w-full mx-auto py-4">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <TransactionList />
        <div
          onClick={handleEditAccountRoute.bind(null, accountDetails._id)}
          className="p-2 gap-2 cursor-pointer text-slate-400 hover:text-slate-600 rounded-md border border-black inline-block mt-4"
        >
          <Edit sx={{ fontSize: 20, marginRight: "8px" }} />
          Edit Account
        </div>
      </section>
    </motion.main>
  );
};
