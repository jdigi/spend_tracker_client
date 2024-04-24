import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import { Record } from "./components/TempSubmit";
import { RecordList } from "./components/Record";

import { Dashboard } from "./pages/Dashboard";
import { AccountEntry } from "./pages/Account";
import { TransactionEntryForm } from "./pages/Transaction";
import { TransactionList } from "./pages/TransactionList";
import { Tracker } from "./pages/Tracker";
import { AccountOverview } from "./pages/AccountOverview";
import { AccountDetail } from "./components/AccountOverview";
import { TransactionOverview } from "./pages/TransactionOverview";
import "./App.css";
import { AccountList } from "./components/AccountList";

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
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/transaction">Transaction</Link>
            </li>
            <li>
              <Link to="/transaction/list">Transaction List</Link>
            </li>
            <li>
              <Link to="/tracker">Tracker</Link>
            </li>
            <li>
              <Link to="/account/overview">Account Overview</Link>
            </li>
            <li>
              <Link to="/transaction/overview">Transaction Overview</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record/list" element={<RecordList />} />
          <Route path="/account" element={<AccountEntry />} />
          {/* <Route path="/account/:id" element={<AccountEntry />} /> */}
          <Route path="/account/:id" element={<AccountDetail />} />
          <Route path="/transaction" element={<TransactionEntryForm />} />
          <Route path="/transaction/:id" element={<TransactionEntryForm />} />
          <Route path="/transaction/list" element={<TransactionList />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/tracker/:id" element={<Tracker />} />
          <Route path="/account/overview" element={<AccountOverview />} />
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
