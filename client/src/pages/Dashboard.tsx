import { useState } from "react";
import { useNavigate } from "react-router";
import { AccountList } from "../components/AccountList";
import { TransactionList } from "../components/TransactionList";

export const Dashboard = () => {
  return (
    <main className="max-w-screen-xl w-full p-4 mx-auto">
      <section className="grid grid-col-2 gap-x-8">
        <header className="border-t border-black py-4 w-full col-span-2">
          <h1>Dashboard</h1>
        </header>
        <div className="col-span-1">
          <h2>Accounts</h2>
          <hr />
          <AccountList />
        </div>
        <div className="col-span-1">
          <h2>Accounts</h2>
          <hr />
          <TransactionList />
        </div>
      </section>
    </main>
  );
};
