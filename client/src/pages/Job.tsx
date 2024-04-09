// component to create a new record or update an existing record
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export const JobEntry = () => {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    firstRound: false,
    secondRound: false,
    rejection: false,
  });
  const [isNew, setIsNew] = useState(true); // check if the record is new or existing
  const navigate = useNavigate(); // navigate to different routes
  const routeParams = useParams(); // get URL parameters

  useEffect(() => {
    async function fetchData() {
      // fetch new data if the record is not new (has params.id in the URL)
      const jobId = routeParams.id?.toString() || undefined;
      // if No ID, then it's a new record => return/escape
      if (!jobId) return;
      // otherwise, set isNew to false and fetch the record data
      setIsNew(false);
      console.log("updating record with ID:", jobId);
      // fetch record data
      const response = await fetch(`http://localhost:5050/job/${jobId}`);
      // check for errors
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      // set record data equal to response data
      const data = await response.json();
      // if no data, return
      if (!data) {
        console.warn(`No data found for record with ID: ${jobId}`);
        return;
      }
      // set form data with the record data
      setFormData(data);
    }
    fetchData();
  }, [routeParams.id, navigate]); // if the id or navigate changes, refetch data

  // method to update the form data
  const updateForm = (event: any) => {
    // destructure event.target
    const { name, type, checked, value } = event.target;
    // set form data
    // * copy previous form data via spread operator ...
    // * update the form data with the new values
    // * use computed property [name] to dynamically update the form data
    // * * The key for the data to update is determined dynamically from the name attribute of the input field
    // * if the type is checkbox, use checked value
    // * if the type is not checkbox, use value
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // method to submit the form data
  async function onSubmit(e: any) {
    e.preventDefault();
    const job = { ...formData }; // person object from form data
    try {
      let response;
      if (isNew) {
        // if adding a new record, use POST method to /record
        response = await fetch("http://localhost:5050/job/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });
      } else {
        // if updating an existing record, use PATCH method to /record/:id
        response = await fetch(`http://localhost:5050/job/${routeParams.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`A problem occurred with your fetch operation:`, error);
    } finally {
      setFormData({
        company: "",
        position: "",
        firstRound: false,
        secondRound: false,
        rejection: false,
      }); // reset form
      navigate("/job/list"); // navigate to record list
    }
  }

  // return the entire form
  return (
    <>
      <h3>Create/Update Record</h3>
      <form
        onSubmit={onSubmit}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Job Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Company Name
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="FAANG Inc."
                    value={formData.company}
                    onChange={updateForm}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Position
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="position"
                    id="position"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Software Engineer"
                    value={formData.position}
                    onChange={updateForm}
                    required
                  />
                </div>
              </div>
            </div>
            <div>
              <fieldset className="mt-4">
                <legend className="sr-only">Application Status</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  <div className="flex items-center">
                    <input
                      id="firstRound"
                      name="firstRound"
                      type="checkbox"
                      checked={formData.firstRound}
                      onChange={updateForm}
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                    />
                    <label
                      htmlFor="firstRound"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      First Round
                    </label>
                    <input
                      id="secondRound"
                      name="secondRound"
                      type="checkbox"
                      checked={formData.secondRound}
                      onChange={updateForm}
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                    />
                    <label
                      htmlFor="secondRound"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Second Round
                    </label>
                    <input
                      id="rejection"
                      name="rejection"
                      type="checkbox"
                      checked={formData.rejection}
                      onChange={updateForm}
                      className="h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer"
                    />
                    <label
                      htmlFor="rejection"
                      className="ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4"
                    >
                      Rejection
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Job Record"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
};
