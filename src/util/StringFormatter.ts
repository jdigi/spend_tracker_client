export const StringFormatter = () => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(dateObj);
  };

  const formatCurrency = (amount: number) => {
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return currencyFormatter.format(amount);
  };

  return { formatDate, formatCurrency };
};
