import { useTrackerData } from "../hooks/useTrackerData";
import { useNavigate } from "react-router";
import { IconComponent } from "../util/IconComponent";
import { AddCircle } from "@mui/icons-material";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface TrackerProps {
  _id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
  category_icon: string;
}

export const TrackerList = () => {
  const { trackerData, isLoading } = useTrackerData();
  const navigate = useNavigate();

  const handleTrackerDetailRoute = (trackerId: string) => {
    navigate(`/tracker/${trackerId}`);
  };

  const handleTrackerCreateRoute = () => {
    navigate(`/tracker/create`);
  };

  // * assuming amount is in USD
  // TODO: seperate into utility function for reuse + add locale support
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  const formatCurrency = (amount: number) => currencyFormatter.format(amount);

  const trackerRow = (tracker: TrackerProps) => {
    // destructuring tracker object && setting default values
    const { _id, name, category, limit, spent } = tracker;

    return (
      <div
        key={_id}
        className="grid grid-cols-[20%_minmax(20%,_1fr)_20%] gap-y-1 cursor-pointer hover:bg-[#CBE0D950] p-2"
        onClick={handleTrackerDetailRoute.bind(null, _id)}
      >
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? (
            <Skeleton width={50} height={50} />
          ) : (
            <IconComponent category={category} />
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-1 row-end-2 row-span-1">
          {isLoading ? <Skeleton width={100} height={20} /> : name}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-3 row-span-1">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            `percentage spent: ${spent / limit}`
          )}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(spent)
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mx-auto">
      <div className="border border-black rounded-lg overflow-hidden">
        {trackerData.map((tracker: TrackerProps) => trackerRow(tracker))}
      </div>
      <div className="w-full mt-8 flex itemc-center justify-center">
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
  );
};
