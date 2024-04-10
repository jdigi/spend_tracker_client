import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { JobEntry } from "../components/JobEntry";

interface JobProps {
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
      setJobs(data);
    }

    getJobs();
    return;
  }, [jobs.length]);

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

  // edit job
  const editJob = async (id: string) => {
    navigate(`/job/${id}`);
  };

  // TODO: add sorting by company name, status, etc.
  const sortDataByStringName = (data: JobProps[], key: "company") => {
    return data.sort((a, b) => {
      const textA = a[key].toUpperCase();
      const textB = b[key].toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  };

  // TODO: add pagination

  return (
    <>
      <div className="w-full mx-auto flex justify-center">
        <div className="w-[800px]">
          <header className="grid grid-cols-7 font-bold text-sm">
            <div className="pl-2">Company</div>
            <div className="col-span-2 pl-2">Position</div>
            <div className="text-center">1st Round</div>
            <div className="text-center">2nd Round</div>
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
