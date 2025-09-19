import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatChange = (change: number): string => {
  const sign = change >= 0 ? "+" : "";
  return `${sign}${change.toFixed(2)}%`;
};

export const formatHoldings = (holdings: number): string => {
  if (holdings === 0) return "0.0000";
  if (holdings < 1) return holdings.toFixed(4);
  return holdings.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US");
};
