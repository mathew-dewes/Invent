import { Prisma } from "@/generated/prisma/client"
import { TimeFrame } from "./types"


export const getFilterKey = (pathname: string) => {
    if (pathname === '/stock') return "stock"
    if (pathname === "/finance") return "type"
    if (pathname === "/requests" || "/purchases") return "status"


}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));




export function decimalToMoney(value: Prisma.Decimal) {
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value.toNumber())
};

export function convertToMoney(value: number){
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value)
}


export function getNZDateKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date); 
};

export function formatTimeToNZ(date = new Date()){
    return new Intl.DateTimeFormat("en-NZ",{
    timeZone: "Pacific/Auckland",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};

export function getStartDate(timeFrame?: TimeFrame) {
  const now = new Date();
  const start = new Date(now);

  switch (timeFrame) {
    case "day":
      start.setUTCHours(0, 0, 0, 0);
      break;

    case "week":
      start.setUTCDate(start.getUTCDate() - 7);
      start.setUTCHours(0, 0, 0, 0);
      break;

    case "month":
      start.setUTCDate(start.getUTCDate() - 28);
      start.setUTCHours(0, 0, 0, 0);
      break;

    case "year":
  start.setUTCDate(start.getUTCDate() - 365);
  start.setUTCHours(0, 0, 0, 0);
      break;

    default:
      return undefined; 
  }

  return start;
}



export function daysAgo(createdAt: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - createdAt.getTime();



  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}
