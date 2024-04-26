import { useTrackerDetails } from "../hooks/useTrackerDetails";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { IconComponent } from "../util/IconComponent";
import { Edit } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const TrackerOverview = () => {
  const { trackerDetails, isLoading } = useTrackerDetails();
  const navigate = useNavigate();

  const handleEditPageRoute = (trackerId: string) => {
    navigate(`/tracker/edit/${trackerId}`);
  };

  // * assuming amount is in USD
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  if (!trackerDetails) {
    return (
      <div className="max-w-screen-xl w-full p-4 mx-auto h-full">
        No Tracker data available.
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
        <h1 className="text-3xl font-light">Tracker Details</h1>
      </header>
      <section className="grid grid-cols-5 w-full py-8 border-b border-slate-300">
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : trackerDetails.category ? (
            <div className="flex items-center justify-center p-4 rounded-full border-2 border-black">
              <IconComponent category={trackerDetails.category} typeSize={72} />
            </div>
          ) : null}
        </div>

        <div className="col-start-2 col-end-5 row-start-1 row-end-2 row-span-1 text-3xl font-semibold self-end">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            trackerDetails.name
          )}
        </div>
        <div className="col-start-2 col-end-5 row-start-2 row-end-3 row-span-1 text-lg font-semibold text-slate-400">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            `${Math.round(
              (trackerDetails.spent / trackerDetails.limit) * 100
            )}%`
          )}
        </div>
        <div className="col-start-5 col-end-6 row-span-1 row-start-1 row-end-2 self-center text-3xl font-black self-end">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(trackerDetails.spent)
          )}
        </div>
        <div className="col-start-5 col-end-6 row-span-1 row-start-2 row-end-3 self-center text-lg font-semibold text-slate-400">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            `of ${formatCurrency(trackerDetails.limit)}`
          )}
        </div>
        <div className="h-5 mt-8 mx-auto col-span-5 rounded-md bg-slate-300 w-11/12 overflow-hidden">
          <div
            className="h-full bg-slate-600"
            style={{
              width: `${(trackerDetails.spent / trackerDetails.limit) * 100}%`,
            }}
          ></div>
        </div>
      </section>
      <div
        onClick={handleEditPageRoute.bind(null, trackerDetails._id)}
        className="p-2 gap-2 cursor-pointer text-slate-400 hover:text-slate-600 rounded-md border border-black inline-block mt-4"
      >
        <Edit sx={{ fontSize: 20, marginRight: "8px" }} />
        Edit Tracker
      </div>
    </motion.main>
  );
};
