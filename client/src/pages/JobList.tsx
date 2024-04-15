import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { JobEntry } from "../components/JobEntry";
import { SortUtility } from "../components/SortUtility";

interface JobProps {
  date: string;
  _id: string;
  company: string;
  position: string;
  firstRound: boolean;
  secondRound: boolean;
  rejection: boolean;
}

export const JobList = () => {
  const [jobs, setJobs] = useState([] as JobProps[]);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch jobs
    async function getJobs() {
      const response = await fetch("http://localhost:5050/job/");
      // check for errors
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      // set jobs state with data from response via await
      const data = await response.json();
      // setJobs(data);
      // sort jobs by date in ascending order by default
      setJobs(sortDataByPropertyName(data, "date", "asc"));
    }
    // call getJobs function
    getJobs();
  }, [jobs.length]); // if jobs.length changes, refetch data

  // delete job
  const deleteJob = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5050/job/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error(`A problem occurred with your fetch operation:`, error);
    }
  };

  const editJob = async (id: string) => {
    navigate(`/job/${id}`);
  };

  const sortDataByPropertyName = (
    data: JobProps[],
    key: keyof JobProps,
    order: "asc" | "desc" = "asc"
  ) => {
    // use ... spread operator to (shallow) copy the data array
    // this helps ensure React recognizes the state change
    // and triggers a re-render
    const sortedData = [...data].sort((a, b) => {
      // set valueA and valueB to the values of the key property
      let valueA = a[key];
      let valueB = b[key];

      // normalize string values for case insensitive comparison
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      // determine sort order
      let comparison = 0;
      if (valueA < valueB) {
        comparison = -1;
      } else if (valueA > valueB) {
        comparison = 1;
      }

      // reverse the comparison result if order is descending
      return order === "desc" ? comparison * -1 : comparison;
    });
    return sortedData;
  };

  const handleSort = (sortKey: string, sortOrder: string) => {
    const sortedData = sortDataByPropertyName(
      jobs,
      sortKey as keyof JobProps,
      sortOrder as "asc" | "desc"
    );
    setJobs(sortedData);
  };

  const sortOptions = [
    { value: "date", label: "Date" },
    { value: "company", label: "Company" },
    { value: "position", label: "Position" },
    { value: "firstRound", label: "1st Round" },
    { value: "secondRound", label: "2nd Round" },
    { value: "rejection", label: "Rejection" },
  ];

  // TODO: add pagination

  return (
    <>
      <div className="w-full mx-auto flex justify-center">
        <SortUtility sortOptions={sortOptions} handleSort={handleSort} />
        <div className="w-[800px]">
          <header className="grid grid-cols-10 font-bold text-sm">
            <div className="pl-2 col-span-2">Date</div>
            <div className="col-span-2 pl-2">Company</div>
            <div className="col-span-2 pl-2">Position</div>
            <div className="text-center">Round 1</div>
            <div className="text-center">Round 2</div>
            <div className="text-center">Rejection</div>
          </header>

          {jobs.map((job) => (
            <JobEntry
              key={job._id}
              job={job}
              deleteJob={deleteJob}
              editJob={editJob}
            />
          ))}
        </div>
      </div>
    </>
  );
};
