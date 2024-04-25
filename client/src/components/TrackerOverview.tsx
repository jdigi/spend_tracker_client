import { useTrackerDetails } from "../hooks/useTrackerDetails";
import { useNavigate } from "react-router";
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
    return <div>No account data available.</div>;
  }

  return (
    <div className="w-[640px] mx-auto">
      <section className="grid grid-cols-5">
        <header className="col-span-5">
          <h1>Tracker Detail</h1>
        </header>
        <div className="col-span-1 col-start-1 col-end-2 row-span-2 self-center justify-self-center">
          {isLoading ? <Skeleton width={50} height={50} /> : null}
          {trackerDetails.logo_url && (
            <img
              src={trackerDetails.category_icon}
              alt={trackerDetails.name}
              style={{ display: isLoading ? "none" : undefined }}
            />
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-2 row-end-2 row-span-1">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            trackerDetails.name
          )}
        </div>
        <div className="col-span-1 col-start-2 col-end-3 row-start-3 row-end-3 row-span-1">
          {isLoading ? (
            <Skeleton width={100} height={20} />
          ) : (
            trackerDetails.category
          )}
        </div>
        <div className="col-span-1 col-start-3 col-end-4 row-span-2 self-center">
          {isLoading ? (
            <Skeleton width={75} height={40} />
          ) : (
            formatCurrency(trackerDetails.spent)
          )}
        </div>
      </section>
      <section>
        <header>
          <h2>Edit Tracker</h2>
        </header>
        <button onClick={handleEditPageRoute.bind(null, trackerDetails._id)}>
          Edit Tracker
        </button>
      </section>
    </div>
  );
};
