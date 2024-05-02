import { useAccountData } from "../hooks/useAccountData";
import { useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import { IconComponent } from "../util/IconComponent";
import { StringFormatter } from "../util/StringFormatter";
import { Edit, DeleteForever } from "@mui/icons-material";
import { PageTitle } from "./PageTitle";
import Skeleton from "react-loading-skeleton";

interface TrackerProps {
  _id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
  category_icon: string;
}

export const TrackerOverview = () => {
  const routeParams = useParams();
  const trackerId = routeParams.id?.toString() || undefined;
  const { data, isLoading, error } = useAccountData<TrackerProps>(
    `https://spend-tracker-backend.vercel.app/tracker/${trackerId}`
  );
  const navigate = useNavigate();
  const { formatCurrency } = StringFormatter();

  const handleEditPageRoute = (trackerId: string) => {
    navigate(`/tracker/edit/${trackerId}`);
  };

  // TODO: add to useAccountData hook
  const deleteTracker = async (id: string) => {
    try {
      const response = await fetch(
        `https://spend-tracker-backend.vercel.app/tracker/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate("/");
    } catch (error) {
      console.error(`A problem occurred with your fetch operation:`, error);
    }
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
      <PageTitle title="Tracker Details" />
      <section className="grid grid-cols-5 w-full py-8 border-b border-slate-300">
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading || !data ? (
            <Skeleton width={50} height={50} />
          ) : data.category ? (
            <div className="flex items-center justify-center p-1 md:p-4 rounded-full border-2 border-black w-12 h-12 md:w-auto md:h-auto">
              <IconComponent category={data.category} typeSize={72} />
            </div>
          ) : null}
        </div>

        <div className="col-start-2 col-end-5 row-start-1 row-end-2 row-span-1 text-xl md:text-3xl font-semibold self-end">
          {isLoading || !data ? (
            <Skeleton width={100} height={20} />
          ) : (
            data.name
          )}
        </div>
        <div className="col-start-1 col-end-5 row-start-4 row-end-5 row-span-1 text-lg font-semibold text-slate-400">
          {isLoading || !data ? (
            <Skeleton width={100} height={20} />
          ) : (
            `${Math.round((data.spent / data.limit) * 100)}%`
          )}
        </div>
        <div className="md:col-start-5 col-start-2 col-end-6 row-span-1 row-start-2 row-end-3 md:row-start-1 md:row-end-2 self-center text-xl md:text-3xl font-black self-end">
          {isLoading || !data ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(data.spent)
          )}
        </div>
        <div className="md:col-start-5 col-end-6 row-span-1 md:row-start-2 md:row-end-3 col-start-2 row-start-3 row-end-4 self-center text-base md:text-lg font-semibold text-slate-400">
          {isLoading || !data ? (
            <Skeleton width={75} height={40} />
          ) : (
            `of ${formatCurrency(data.limit)}`
          )}
        </div>
        <div className="h-5 mt-2 md:mt-8 mx-auto col-span-5 rounded-md bg-slate-300 w-full md:w-11/12 overflow-hidden">
          {isLoading || !data ? (
            <Skeleton width="100%" height={40} />
          ) : (
            <div
              className="h-full bg-slate-600"
              style={{
                width: `${(data.spent / data.limit) * 100}%`,
              }}
            ></div>
          )}
        </div>
      </section>
      {data && (
        <div className="flex gap-x-4">
          <div
            onClick={() => handleEditPageRoute(data._id)}
            className="p-2 gap-2 cursor-pointer text-slate-400 hover:text-slate-600 rounded-md border border-black inline-block mt-4"
          >
            <Edit sx={{ fontSize: 20, marginRight: "8px" }} />
            Edit Tracker
          </div>
          <div
            onClick={() => deleteTracker(data._id)}
            className="p-2 gap-2 cursor-pointer text-slate-400 hover:text-slate-600 rounded-md border border-black inline-block mt-4"
          >
            <DeleteForever sx={{ fontSize: 20, marginRight: "8px" }} />
            Delete Tracker
          </div>
        </div>
      )}
    </motion.main>
  );
};
