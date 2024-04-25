import { useEffect, useState } from "react";
import { useParams } from "react-router";

export const useTrackerDetails = () => {
  const [trackerDetails, setTrackerDetails] = useState<{ [key: string]: any }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    const getTrackerDetails = async () => {
      setIsLoading(true);

      const trackerId = routeParams.id?.toString() || undefined;
      let url = `http://localhost:5050/tracker/${trackerId}`;

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
        setTrackerDetails(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getTrackerDetails();
  }, [routeParams.id]);
  return { trackerDetails, isLoading };
};
