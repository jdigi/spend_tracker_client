import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Dashboard } from "./pages/Dashboard";
import { AccountEntry } from "./pages/Account";
import { TransactionEntryForm } from "./pages/Transaction";
import { Tracker } from "./pages/Tracker";
import { TrackerOverview } from "./components/TrackerOverview";
import { AccountDetail } from "./components/AccountOverview";
import { AccountCircle } from "@mui/icons-material";
import "react-loading-skeleton/dist/skeleton.css";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className="max-w-screen-xl w-full pt-5 px-4 mx-auto">
          <div className="flex gap-x-4 justify-between w-full text-slate-500 items-center">
            <Link
              to="/"
              className="font-normal text-black hover:text-slate-400 transition-colors duration-2"
            >
              Dashboard
            </Link>
            <AccountCircle sx={{ fontSize: 40 }} />
          </div>
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

        <footer className="w-full h-[250px] bg-black mt-auto flex items-center">
          <div className="max-w-screen-xl w-full px-4 py-8 mx-auto flex justify-between items-center">
            <Link to="/">
              <img
                src="https://empower.me/static/icon-empower-trademark.f9c0947b.svg"
                alt="Empower Logo"
              />
            </Link>
            <div className="mt-2 text-xs text-slate-400 font-semibold p-2 border border-slate-400 cursor-pointer">
              <Link to="/transaction">Create Testing Transaction</Link>
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;
