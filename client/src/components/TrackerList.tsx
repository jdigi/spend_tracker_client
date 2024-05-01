import { motion } from "framer-motion";
import { useAccountData } from "../hooks/useAccountData";
import { useNavigate } from "react-router";
import { IconComponent } from "../util/IconComponent";
import { StringFormatter } from "../util/StringFormatter";
import { AddCircle } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";

interface TrackerProps {
  _id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
  category_icon: string;
}

export const TrackerList = () => {
  const { data, isLoading, error } = useAccountData<TrackerProps[]>(
    "http://localhost:5050/tracker/"
  );
  const navigate = useNavigate();
  const { formatCurrency } = StringFormatter();

  const handleTrackerDetailRoute = (trackerId: string) => {
    navigate(`/tracker/${trackerId}`);
  };

  const handleTrackerCreateRoute = () => {
    navigate(`/tracker/create`);
  };

  const trackerRow = (tracker: TrackerProps) => {
    // destructuring tracker object
    const { _id, name, category, limit, spent } = tracker;

    return (
      <div
        key={_id}
        className="grid grid-cols-[15%_minmax(15%,_1fr)_25%] md:grid-cols-[20%_minmax(20%,_1fr)_20%] gap-y-0 cursor-pointer rounded-md hover:bg-[#CBE0D950] px-2 py-3.5 min-h-[70px]"
        onClick={() => handleTrackerDetailRoute(_id)}
      >
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : (
            <div className="flex items-center justify-center p-0.5 md:p-2 rounded-full border-2 border-black w-8 h-8 md:w-auto md:h-auto">
              <IconComponent category={category} />
            </div>
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 row-span-1 text-sm md:text-base font-bold">
          {isLoading ? <Skeleton width={100} height={20} /> : name}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-3 row-span-1 text-sm md:text-base font-normal text-slate-400">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            `${Math.round((spent / limit) * 100)}%`
          )}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center text-sm md:text-base">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(spent)
          )}
        </div>
        <div className="h-2.5 mt-3 mx-auto col-span-3 rounded-md bg-slate-300 w-11/12 overflow-hidden">
          <div
            className="h-full bg-slate-600"
            style={{
              width: `${(spent / limit) * 100}%`,
            }}
          ></div>
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
    <motion.div
      className="w-full mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      {isLoading || !data ? (
        <Skeleton count={data ? data.length : 5} height={70} />
      ) : (
        <div className="border border-black rounded-lg overflow-hidden p-4">
          {data.map((tracker: TrackerProps) => trackerRow(tracker))}
        </div>
      )}
      <div className="w-full mt-8 flex itemc-center justify-center">
        <div className="flex items-center justify-center p-0.5 rounded-full border-2 border-transparent hover:border-[#000000] transition w-12 h-12 md:w-auto md:h-auto">
          <AddCircle
            sx={{
              fontSize: 64,
              color: "#CBE0D9",
              fill: "black !important",
              cursor: "pointer",
            }}
            onClick={handleTrackerCreateRoute}
          />
        </div>
      </div>
    </motion.div>
  );
};
