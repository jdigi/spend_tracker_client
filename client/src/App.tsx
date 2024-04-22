import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import { Record } from "./components/TempSubmit";
import { RecordList } from "./components/Record";

import { Dashboard } from "./pages/Dashboard";
import { AccountEntry } from "./pages/Account";
import { TransactionEntryForm } from "./pages/Transaction";
import { TransactionList } from "./pages/TransactionList";
import { Tracker } from "./pages/Tracker";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="max-w-4xl w-full mx-auto mt-2 mb-4">
          <ul className="flex gap-x-4 space-between w-full">
            <li>
              <Link to="/">Todo List</Link>
            </li>
            <li>
              <Link to="/record">Record</Link>
            </li>
            <li>
              <Link to="/record/list">Record List</Link>
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
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record/list" element={<RecordList />} />
          <Route path="/account" element={<AccountEntry />} />
          <Route path="/account/:id" element={<AccountEntry />} />
          <Route path="/transaction" element={<TransactionEntryForm />} />
          <Route path="/transaction/:id" element={<TransactionEntryForm />} />
          <Route path="/transaction/list" element={<TransactionList />} />
          <Route path="/tracker" element={<Tracker />} />
          <Route path="/tracker/:id" element={<Tracker />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
