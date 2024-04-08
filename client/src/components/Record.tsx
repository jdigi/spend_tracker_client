import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RecordEntry } from "./RecordEntry";

interface RecordProps {
  _id: string;
  name: string;
  company: string;
  position: string;
  level: string;
}

export const RecordList = () => {
  const [records, setRecords] = useState([] as RecordProps[]);

  // fetch records from db
  useEffect(() => {
    async function getRecords() {
      // set fetch request to /record
      const response = await fetch("http://localhost:5050/record/");
      // if response is not ok, log error message
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      // set records state with data from response
      const data = await response.json();
      setRecords(data);
      console.log("records", records);
    }
    getRecords();
  }, [records.length]);

  const deleteRecord = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5050/record/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setRecords(records.filter((record) => record._id !== id));
    } catch (error) {
      console.error(`A problem occurred with your fetch operation:`, error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 records-wrap">
        {records.map((record) => (
          <RecordEntry
            key={record._id}
            record={record}
            deleteRecord={() => deleteRecord(record._id)}
          />
        ))}
      </div>
    </>
  );
};
