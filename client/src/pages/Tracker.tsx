// component to create a new record or update an existing record
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export const Tracker = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    limit: 0,
    spent: 0,
    iso_currency_code: "USD",
    category_icon: "",
  });
  const [isNew, setIsNew] = useState(true); // check if the record is new or existing
  const navigate = useNavigate(); // navigate to different routes
  const routeParams = useParams(); // get URL parameters

  useEffect(() => {
    async function fetchData() {
      // fetch new data if the record is not new (has params.id in the URL)
      const trackerId = routeParams.id?.toString() || undefined;
      // if No ID, then it's a new record => return/escape
      if (!trackerId) return;
      // otherwise, set isNew to false and fetch the record data
      setIsNew(false);
      // fetch record data
      const response = await fetch(
        `http://localhost:5050/tracker/${trackerId}`
      );
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
        console.warn(`No data found for record with ID: ${trackerId}`);
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
    const transaction = { ...formData }; // person object from form data
    try {
      let response;
      if (isNew) {
        // if adding a new record, use POST method to /record
        response = await fetch("http://localhost:5050/tracker/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(transaction),
        });
      } else {
        // if updating an existing record, use PATCH method to /record/:id
        response = await fetch(
          `http://localhost:5050/tracker/${routeParams.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction),
          }
        );
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(`A problem occurred with your fetch operation:`, error);
    } finally {
      setFormData({
        name: "",
        category: "",
        limit: 0,
        spent: 0,
        iso_currency_code: "USD",
        category_icon: "",
      }); // reset form
      navigate("/"); // navigate to the home page
    }
  }

  // return the entire form
  return (
    <>
      <div className="max-w-2xl mx-auto w-full">
        <h3>Create/Update Record</h3>
        <form
          onSubmit={onSubmit}
          className="border rounded-lg overflow-hidden p-4"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Transaction Details
              </h2>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Tracker Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Empower Checking"
                      value={formData.name}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Category
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="100"
                      value={formData.category}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="limit"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Spend Limit
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="limit"
                      id="limit"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="USD"
                      value={formData.limit}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="spent"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Spent
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="spent"
                      id="spent"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="USD"
                      value={formData.spent}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="iso_currency_code"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Currency Code
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="iso_currency_code"
                      id="iso_currency_code"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Groceries"
                      value={formData.iso_currency_code}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="category_icon"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Category Icon
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="category_icon"
                      id="category_icon"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="USD"
                      value={formData.category_icon}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Save Tracker"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      </div>
    </>
  );
};
