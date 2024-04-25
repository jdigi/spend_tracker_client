import { useEffect, useState } from "react";
import { useParams } from "react-router";

type Tracker = {
  _id: string;
  name: string;
  category: string;
  limit: number;
  spent: number;
  category_icon: string;
};

export const useTrackerData = () => {
  const [trackerData, setTrackerData] = useState<Tracker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    const getTrackerData = async () => {
      setIsLoading(true);

      // optional trackerId to fetch specific tracker
      const trackerId = routeParams.id?.toString() || undefined;
      let url = `http://localhost:5050/tracker/`;
      if (trackerId) {
        url += trackerId;
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          const message = `An error has occured: ${response.status}`;
          console.error(message);
          return;
        }
        const data = await response.json();
        // if no data, return
        if (!data) {
          console.warn(`No data found in response.`);
          return;
        }
        setTrackerData(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTrackerData();
  }, [trackerData.length, routeParams.id]);
  return { trackerData, isLoading };
};
