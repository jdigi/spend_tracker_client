import { Suspense } from "react";
import { motion } from "framer-motion";
import { AccountList } from "../components/AccountList";
import { TrackerList } from "../components/TrackerList";
import { AccountBalance, MonetizationOn } from "@mui/icons-material";
import { PageTitle } from "../components/PageTitle";
import Skeleton from "react-loading-skeleton";

export const Dashboard = () => {
  return (
    <motion.main
      className="max-w-screen-xl w-full p-4 mx-auto h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <PageTitle title="Dashboard" />
      <div className="flex flex-col items-center justify-center min-h-[80%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 w-full">
          <section className="col-span-1 flex flex-col border-b-8 border-slate-300 md:border-transparent pb-4 md:pb-0">
            <header className="w-full flex flex-col justify-center items-center pb-2 pt-8 md:py-8 gap-y-2 md:gap-y-4">
              <div className="rounded-full bg-[#FCD0BA] w-16 h-16 p-2 md:w-24 md:h-24 md:p-3 flex items-center justify-center">
                <Suspense fallback={<Skeleton width={50} height={50} circle />}>
                  <AccountBalance sx={{ fontSize: 72 }} />
                </Suspense>
              </div>
              <h2 className="text-lg md:text-2xl font-bold font-serif">
                Accounts
              </h2>
            </header>
            <AccountList />
          </section>
          <section className="col-span-1 flex-flex-col">
            <header className="w-full flex flex-col justify-center items-center pb-2 pt-8 md:py-8 gap-y-2 md:gap-y-4">
              <div className="rounded-full bg-[#FCD0BA] w-16 h-16 p-2 md:w-24 md:h-24 md:p-3 flex items-center justify-center">
                <Suspense fallback={<Skeleton width={50} height={50} circle />}>
                  <MonetizationOn sx={{ fontSize: 72 }} />
                </Suspense>
              </div>
              <h2 className="text-lg md:text-2xl font-bold font-serif">
                Trackers
              </h2>
            </header>
            <TrackerList />
          </section>
        </div>
      </div>
    </motion.main>
  );
};
