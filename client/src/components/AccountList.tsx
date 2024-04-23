import { useAccountData } from "../hooks/useAccountData";
// TODO: add skeleton loading

interface Account {
  _id: string;
  account_name: string;
  balance: number;
}

export const AccountList = () => {
  const accountData = useAccountData();

  return (
    <div>
      <h2>Accounts</h2>
      <ul>
        {accountData.map((account: Account) => (
          <li key={account._id}>
            {account.account_name} - {account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};
