import {
  LocalGroceryStore,
  ChildCare,
  LunchDining,
  LocalAtm,
  CurrencyExchange,
  School,
} from "@mui/icons-material";

interface IconProps {
  category: string;
  typeSize?: number;
}

export const IconComponent = ({ category, typeSize = 36 }: IconProps) => {
  switch (category.trim().toLowerCase()) {
    case "grocery":
      return <LocalGroceryStore sx={{ fontSize: typeSize }} />;
    case "kids":
      return <ChildCare sx={{ fontSize: typeSize }} />;
    case "education":
      return <School sx={{ fontSize: typeSize }} />;
    case "food":
      return <LunchDining />;
    case "checking":
      return <LocalAtm sx={{ fontSize: typeSize }} />;
    case "businesschecking":
      return <CurrencyExchange sx={{ fontSize: typeSize }} />;
    default:
      return <LocalGroceryStore sx={{ fontSize: typeSize }} />;
  }
};
