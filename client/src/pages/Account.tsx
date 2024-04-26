// Component to create a new record or update an existing
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export const AccountEntry = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    account_name: "",
    account_type: "",
    balance: 0.0,
    iso_currency_code: "USD",
    logo_url: "",
  });
  const [isNew, setIsNew] = useState(true); // check if the record is new or existing
  const navigate = useNavigate();
  const routeParams = useParams();

  useEffect(() => {
    async function fetchData() {
      // fetch new data if the record is not new (has params.id in the URL)
      const accountId = routeParams.id?.toString() || undefined;
      // if No ID, then it's a new record => return/escape
      if (!accountId) return;
      // otherwise, set isNew to false and fetch the record data
      setIsNew(false);
      // fetch record data
      const response = await fetch(
        `http://localhost:5050/account/${accountId}`
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
        console.warn(`No data found for record with ID: ${accountId}`);
        return;
      }
      // set form data with the record data
      setFormData(data);
    }
    fetchData();
  }, [routeParams.id, navigate]); // if the id or navigate changes, refetch data

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

  async function onSubmit(e: any) {
    e.preventDefault();
    const account = { ...formData };
    try {
      let response;
      if (isNew) {
        // if adding a new record, use POST method to /account
        response = await fetch("http://localhost:5050/account/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(account),
        });
      } else {
        // if updating an existing record, use PATCH method to /account/:id
        response = await fetch(
          `http://localhost:5050/account/${routeParams.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(account),
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
        date: new Date().toISOString().split("T")[0],
        account_name: "",
        account_type: "",
        balance: 0.0,
        iso_currency_code: "USD",
        logo_url: "",
      }); // reset form
      navigate(`/account/${routeParams.id}`); // navigate to account details
    }
  }

  return (
    <>
      <div className="max-w-xl mx-auto w-full py-8">
        <h2 className="text-lg font-semibold mb-4">Create/Update Account</h2>
        <form
          onSubmit={onSubmit}
          className="border rounded-lg overflow-hidden p-4"
        >
          <div className="w-full border-b border-slate-900/10 pb-12">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900 mb-4">
                Account Details
              </h2>
            </div>

            <div className="max-w-2xl w-full flex flex-col gap-y-4">
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Software Engineer"
                      value={formData.date}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="account_name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Account Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="account_name"
                      id="account_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Empower Checking"
                      value={formData.account_name}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="account_type"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Account Type
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="account_type"
                      id="account_type"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Checking"
                      value={formData.account_type}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="balance"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Account Balance
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      name="balance"
                      id="balance"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="100"
                      value={formData.balance}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="iso_currency_code"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Currency Code
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="iso_currency_code"
                      id="iso_currency_code"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="USD"
                      value={formData.iso_currency_code}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="logo_url"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Logo URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="logo_url"
                      id="logo_url"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="https://account-logo.com/logo.png"
                      value={formData.logo_url}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Save Changes"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      </div>
    </>
  );
};
