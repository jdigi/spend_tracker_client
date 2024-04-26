import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useAccountData } from "../hooks/useAccountData";
import { IconComponent } from "../util/IconComponent";
import { AddCircle } from "@mui/icons-material";
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

  const handleAccountCreateRoute = () => {
    navigate(`/account/create`);
  };

  const accountRow = (account: Account) => {
    const { _id, account_name, account_type, balance } = account;

    return (
      <div
        key={_id}
        className="grid grid-cols-[15%_minmax(15%,_1fr)_25%] md:grid-cols-[20%_minmax(20%,_1fr)_20%] gap-y-1 cursor-pointer hover:bg-[#CBE0D950] p-2 py-4 min-h-[70px]"
        onClick={handlePageChange.bind(null, _id)}
      >
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : (
            <div className="flex items-center justify-center p-0.5 md:p-2 rounded-full border-2 border-black w-8 h-8 md:w-auto md:h-auto">
              <IconComponent category={account_type} />
            </div>
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 row-span-1 text-sm md:text-base font-bold">
          {isLoading ? <Skeleton width={100} height={20} /> : account_name}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-3 row-span-1 text-sm md:text-base font-normal text-slate-400">
          {isLoading ? <Skeleton width={100} height={20} /> : account_type}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center text-right text-sm md:text-base font-bold pr-2 ">
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
    <motion.div
      className="w-full mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      {isLoading ? (
        <Skeleton count={accountData.length} height={70} />
      ) : (
        <div className="border border-black rounded-lg overflow-hidden">
          {accountData.map((account: Account) => accountRow(account))}
        </div>
      )}
      <div className="w-full mt-4 md:mt-8 flex itemc-center justify-center">
        <div className="flex items-center justify-center p-0.5 rounded-full border-2 border-transparent hover:border-[#000000] transition w-12 h-12 md:w-auto md:h-auto">
          <AddCircle
            sx={{
              fontSize: 64,
              color: "#CBE0D9",
              fill: "black !important",
              cursor: "pointer",
            }}
            onClick={handleAccountCreateRoute}
          />
        </div>
      </div>
    </motion.div>
  );
};
