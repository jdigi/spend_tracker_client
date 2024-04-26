import { Suspense } from "react";
import { motion } from "framer-motion";
import { AccountList } from "../components/AccountList";
import { TrackerList } from "../components/TrackerList";
import { AccountBalance, MonetizationOn } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Dashboard = () => {
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
        <h1 className="text-3xl font-light">Dashboard</h1>
      </header>
      <div className="flex flex-col items-center justify-center min-h-[80%]">
        <div className="grid grid-cols-2 gap-x-8 w-full">
          <section className="col-span-1 flex flex-col">
            <header className="w-full flex flex-col justify-center items-center py-8 gap-y-4">
              <div className="rounded-full bg-[#FCD0BA] w-24 h-24 p-3 flex items-center justify-center">
                <Suspense fallback={<Skeleton width={50} height={50} circle />}>
                  <AccountBalance sx={{ fontSize: 72 }} />
                </Suspense>
              </div>
              <h2 className="text-2xl font-bold">Accounts</h2>
            </header>
            <AccountList />
          </section>
          <section className="col-span-1 flex-flex-col">
            <header className="w-full flex flex-col justify-center items-center py-8 gap-y-4">
              <div className="rounded-full bg-[#FCD0BA] w-24 h-24 p-3 flex items-center justify-center">
                <Suspense fallback={<Skeleton width={50} height={50} circle />}>
                  <MonetizationOn sx={{ fontSize: 72 }} />
                </Suspense>
              </div>
              <h2 className="text-2xl font-bold">Trackers</h2>
            </header>
            <TrackerList />
          </section>
        </div>
      </div>
    </motion.main>
  );
};
