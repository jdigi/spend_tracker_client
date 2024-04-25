import {
  LocalGroceryStore,
  ChildCare,
  LunchDining,
  LocalAtm,
  CurrencyExchange,
} from "@mui/icons-material";

interface IconProps {
  category: string;
}

export const IconComponent = ({ category }: IconProps) => {
  switch (category.trim().toLowerCase()) {
    case "grocery":
      return <LocalGroceryStore sx={{ fontSize: 36 }} />;
    case "kids":
      return <ChildCare sx={{ fontSize: 36 }} />;
    case "food":
      return <LunchDining />;
    case "checking":
      return <LocalAtm sx={{ fontSize: 36 }} />;
    case "businesschecking":
      return <CurrencyExchange sx={{ fontSize: 36 }} />;
    default:
      return <LocalGroceryStore sx={{ fontSize: 36 }} />;
  }
};
