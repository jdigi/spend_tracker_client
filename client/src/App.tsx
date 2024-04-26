import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Dashboard } from "./pages/Dashboard";
import { AccountEntry } from "./pages/Account";
import { TransactionEntryForm } from "./pages/Transaction";
import { Tracker } from "./pages/Tracker";
import { TrackerOverview } from "./components/TrackerOverview";
import { AccountDetail } from "./components/AccountOverview";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="max-w-screen-xl w-full p-4 mx-auto">
          <ul className="flex gap-x-4 space-between w-full text-slate-500">
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/transaction">Create Transaction</Link>
            </li>
          </ul>
        </nav>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/account" element={<AccountEntry />} />
            <Route path="/account/create" element={<AccountEntry />} />
            <Route path="/account/:id" element={<AccountDetail />} />
            <Route path="/account/edit/:id" element={<AccountEntry />} />
            <Route path="/transaction" element={<TransactionEntryForm />} />
            <Route path="/transaction/:id" element={<TransactionEntryForm />} />
            <Route path="/tracker/create" element={<Tracker />} />
            <Route path="/tracker/:id" element={<TrackerOverview />} />
            <Route path="/tracker/edit/:id" element={<Tracker />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>

      <footer className="w-full h-[250px] bg-black mt-auto">
        <div className="max-w-screen-xl w-full px-4 py-8 mx-auto">
          <img
            src="https://empower.me/static/icon-empower-trademark.f9c0947b.svg"
            alt="Empower Logo"
          />
        </div>
      </footer>
    </>
  );
}

export default App;
