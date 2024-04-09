interface Job {
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
  <div className="job border border-black grid grid-cols-5">
    <div className="self-center">{job.company}</div>
    <div className="self-center">{job.position}</div>
    <div className={`job-status ${job.firstRound ? "checked" : ""}`}>
      <div className="checkbox"></div>
    </div>
    <div className={`job-status ${job.secondRound ? "checked" : ""}`}>
      <div className="checkbox"></div>
    </div>
    <div className={`job-status ${job.rejection ? "checked" : ""}`}>
      <div className="checkbox"></div>
    </div>
    <button onClick={() => deleteJob(job._id)}>Delete</button>
    <button onClick={() => editJob(job._id)}>Edit</button>
  </div>
);
