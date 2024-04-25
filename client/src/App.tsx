import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { AccountEntry } from "./pages/Account";
import { TransactionEntryForm } from "./pages/Transaction";
import { TransactionList } from "./pages/TransactionList";
import { Tracker } from "./pages/Tracker";
import { TrackerOverview } from "./components/TrackerOverview";
import { AccountOverview } from "./pages/AccountOverview";
import { AccountList } from "./components/AccountList";
import { AccountDetail } from "./components/AccountOverview";
import { TransactionOverview } from "./pages/TransactionOverview";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="max-w-4xl w-full mx-auto mt-2 mb-4">
          <ul className="flex gap-x-4 space-between w-full">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/account">Create Account</Link>
            </li>
            <li>
              <Link to="/tracker/create">Create Tracker</Link>
            </li>
            <li>
              <Link to="/transaction">Create Transaction</Link>
            </li>
            <li>
              <Link to="/transaction/list">Transaction List</Link>
            </li>
            <li>
              <Link to="/accounts/list">Accounts List</Link>
            </li>
            <li>
              <Link to="/trackers/list">Trackers List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/account" element={<AccountEntry />} />
          <Route path="/account/create" element={<AccountEntry />} />
          <Route path="/accounts/list" element={<AccountList />} />
          <Route path="/account/:id" element={<AccountDetail />} />
          <Route path="/account/edit/:id" element={<AccountEntry />} />
          <Route path="/transaction" element={<TransactionEntryForm />} />
          <Route path="/transaction/:id" element={<TransactionEntryForm />} />
          <Route path="/transaction/list" element={<TransactionList />} />
          <Route path="/tracker/create" element={<Tracker />} />
          <Route path="/trackers/list" element={<TrackerOverview />} />
          <Route path="/tracker/:id" element={<TrackerOverview />} />
          <Route path="/tracker/edit/:id" element={<Tracker />} />
          <Route
            path="/transaction/overview"
            element={<TransactionOverview />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
