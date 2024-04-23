import { AccountList } from "../components/AccountList";

export const AccountOverview = () => {
  return (
    <main className="max-w-screen-xl w-full p-4 mx-auto">
      <section className="grid grid-col-2 gap-x-8">
        <header className="border-t border-black py-4 w-full col-span-2">
          <h1>Account Overview</h1>
        </header>
        <div className="col-span-1">
          <AccountList />
        </div>
        <div className="col-span-1">
          <h2>Transactions</h2>
          <p>Transaction list goes here</p>
        </div>
      </section>
    </main>
  );
};
