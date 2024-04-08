interface Record {
  _id: string;
  company: string;
  position: string;
  level: string;
}

interface RecordProps {
  record: Record;
  deleteRecord: (id: string) => void;
}

export const RecordEntry = ({ record, deleteRecord }: RecordProps) => (
  <div className="record p-8">
    <div>{record.company}</div>
    <div>{record.position}</div>
    <div>{record.level}</div>
    <button onClick={() => deleteRecord(record._id)}>Delete</button>
  </div>
);
