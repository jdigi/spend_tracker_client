import { useState } from "react";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  return (
    <main className="max-w-screen-xl w-full p-4 mx-auto">
      <section className="grid grid-col-2 gap-x-8">
        <header className="border-t border-black py-4 w-full col-span-2">
          <h1>Dashboard</h1>
        </header>
        <div className="col-span-1">
          <h2>Accounts</h2>
          <p>Account list goes here</p>
        </div>
        <div className="col-span-1">
          <h2>Accounts</h2>
          <p>Account list goes here</p>
        </div>
      </section>
    </main>
  );
};
