interface Job {
  date: string;
  _id: string;
  company: string;
  position: string;
  firstRound: boolean;
  secondRound: boolean;
  rejection: boolean;
}

interface JobProps {
  job: Job;
  deleteJob: (id: string) => void;
  editJob: (id: string) => void;
}

export const JobEntry = ({ job, deleteJob, editJob }: JobProps) => (
  <div className="job border border-black grid grid-cols-10 mb-2">
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      {job.date}
    </div>
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      {job.company}
    </div>
    <div className="self-center place-content-center p-2 border-r h-full col-span-2 text-sm">
      {job.position}
    </div>
    <div
      className={`self-center job-status ${
        job.firstRound ? "checked" : ""
      } items-center p-2 border-r h-full`}
    >
      <div className="checkbox"></div>
    </div>
    <div
      className={`self-center job-status ${
        job.secondRound ? "checked" : ""
      } items-center p-2 border-r h-full`}
    >
      <div className="checkbox"></div>
    </div>
    <div
      className={`self-center job-status ${
        job.rejection ? "checked" : ""
      } items-center p-2 h-full`}
    >
      <div className="checkbox rejection"></div>
    </div>
    <div className="flex flex-col">
      <button
        className="rounded-none bg-orange-200 font-bold text-sm hover:border-orange-400 hover:bg-orange-300 hover:text-white transition-colors"
        onClick={() => deleteJob(job._id)}
      >
        Delete
      </button>
      <button
        className="rounded-none bg-red-200 font-bold text-sm hover:border-red-400 hover:bg-red-300 hover:text-white transition-colors"
        onClick={() => editJob(job._id)}
      >
        Edit
      </button>
    </div>
  </div>
);
