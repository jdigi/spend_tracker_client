import { useTransactionData } from "../hooks/useTransactionData";
// TODO: add skeleton loading

interface Transaction {
  account_id: string;
  amount: number;
  merchant_name: string;
}

export const TransactionList = () => {
  const transactionData = useTransactionData();

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactionData.map((transaction: Transaction) => (
          <li key={transaction.account_id}>
            {transaction.merchant_name} - {transaction.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};
