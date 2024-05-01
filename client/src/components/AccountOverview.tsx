import { useAccountData } from "../hooks/useAccountData";
import { motion } from "framer-motion";
import { TransactionList } from "./TransactionList";
import { useNavigate, useParams } from "react-router";
import { IconComponent } from "../util/IconComponent";
import { StringFormatter } from "../util/StringFormatter";
import { Edit } from "@mui/icons-material";
import { PageTitle } from "./PageTitle";
import Skeleton from "react-loading-skeleton";

interface AccountProps {
  _id: string;
  account_name: string;
  account_type: string;
  balance: number;
  logo_url: string;
}

export const AccountDetail = () => {
  const routeParams = useParams();
  const accountId = routeParams.id?.toString() || undefined;
  const { data, isLoading, error } = useAccountData<AccountProps>(
    `http://localhost:5050/account/${accountId}`
  );
  const navigate = useNavigate();
  const { formatCurrency } = StringFormatter();

  const handleEditAccountRoute = (accountId: string) => {
    navigate(`/account/edit/${accountId}`);
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
    <motion.main
      className="max-w-screen-xl w-full p-4 mx-auto h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle title="Account Details" />
      <section className="grid grid-cols-5 w-full py-8 border-b border-slate-300">
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading || !data ? (
            <Skeleton width={50} height={50} />
          ) : data.account_type ? (
            <div className="flex items-center justify-center p-1 md:p-4 rounded-full border-2 border-black w-12 h-12 md:w-auto md:h-auto">
              <IconComponent category={data.account_type} typeSize={72} />
            </div>
          ) : null}
        </div>
        <div className="col-start-2 col-end-5 row-start-1 row-end-2 row-span-1 text-xl md:text-3xl font-semibold self-end">
          {isLoading || !data ? (
            <Skeleton width={100} height={20} />
          ) : (
            data.account_name
          )}
        </div>
        <div className="col-start-2 col-end-5 row-start-2 row-end-3 row-span-1 text-lg font-normal text-slate-400">
          {isLoading || !data ? (
            <Skeleton width={100} height={20} />
          ) : (
            data.account_type
          )}
        </div>
        <div className="md:col-start-5 col-end-6 md:row-span-2 col-start-2 self-center text-xl md:text-3xl font-black">
          {isLoading || !data ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(data.balance)
          )}
        </div>
      </section>
      <section className="max-w-screen-lg w-full mx-auto py-4">
        <h2 className="text-xl font-semibold mb-4">Transactions</h2>
        <TransactionList />
        {data && (
          <div
            onClick={() => handleEditAccountRoute(data._id)}
            className="p-2 gap-2 cursor-pointer text-slate-400 hover:text-slate-600 rounded-md border border-black inline-block mt-4"
          >
            <Edit sx={{ fontSize: 20, marginRight: "8px" }} />
            Edit Account
          </div>
        )}
      </section>
    </motion.main>
  );
};
