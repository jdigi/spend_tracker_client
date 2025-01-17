import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { PageTitle } from "../components/PageTitle";

export const TransactionEntryForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    account_id: "",
    amount: 0.0,
    iso_currency_code: "USD",
    merchant_name: "",
    category: "",
    category_id: "",
    category_icon_url: "",
  });
  const [isNew, setIsNew] = useState(true);
  const navigate = useNavigate();
  const routeParams = useParams();

  // TODO: use/create custom hook w/ form component to handle form state and fetch data

  useEffect(() => {
    async function fetchData() {
      // fetch new data if the record is not new (has params.id in the URL)
      const transactionId = routeParams.id?.toString() || undefined;
      // if No ID, then it's a new record => return/escape
      if (!transactionId) return;
      // otherwise, set isNew to false and fetch the record data
      setIsNew(false);
      // fetch record data
      const response = await fetch(
        `https://spend-tracker-backend.vercel.app/transaction/${transactionId}`
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
        console.warn(`No data found for record with ID: ${transactionId}`);
        return;
      }
      // set form data with the record data
      setFormData(data);
    }
    fetchData();
  }, [routeParams.id, navigate]);

  // method to update the form data
  const updateForm = (event: any) => {
    // destructure event.target
    const { name, type, checked, value } = event.target;
    // set form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    const transaction = { ...formData };
    try {
      let response;
      if (isNew) {
        // if adding a new record, use POST method to /record
        response = await fetch(
          "https://spend-tracker-backend.vercel.app/transaction/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(transaction),
          }
        );
      } else {
        // if updating an existing record, use PATCH method to /record/:id
        response = await fetch(
          `https://spend-tracker-backend.vercel.app/transaction/${routeParams.id}`,
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
        date: new Date().toISOString().split("T")[0],
        account_id: "",
        amount: 0.0,
        iso_currency_code: "USD",
        merchant_name: "",
        category: "",
        category_id: "",
        category_icon_url: "",
      }); // reset form
      navigate("/");
    }
  }

  return (
    <main className="max-w-screen-xl w-full p-4 mx-auto h-full">
      <PageTitle title="Create Test Transaction" />
      <div className="max-w-xl mx-auto w-full py-8">
        <form
          onSubmit={onSubmit}
          className="border rounded-lg overflow-hidden p-4"
        >
          <div className="w-full border-b border-slate-900/10 pb-12">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900 mb-4">
                Transaction Details
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
                  htmlFor="account_id"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Account ID
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="account_id"
                      id="account_id"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Empower Checking"
                      value={formData.account_id}
                      onChange={updateForm}
                      required
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Amount
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="100"
                      value={formData.amount}
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
                  htmlFor="merchant_name"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Merchant Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="merchant_name"
                      id="merchant_name"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Target"
                      value={formData.merchant_name}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Category Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="category"
                      id="category"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Groceries"
                      value={formData.category}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="category_id"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Category ID
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="category_id"
                      id="category_id"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="USD"
                      value={formData.category_id}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="category_icon_url"
                  className="block text-sm font-medium leading-6 text-slate-900"
                >
                  Category Icon
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                    <input
                      type="text"
                      name="category_icon_url"
                      id="category_icon_url"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="https://example.com/icon.png"
                      value={formData.category_icon_url}
                      onChange={updateForm}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Save Transaction"
            className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
          />
        </form>
      </div>
    </main>
  );
};
