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

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const startOfCreatedDay = new Date(
    createdAt.getFullYear(),
    createdAt.getMonth(),
    createdAt.getDate()
  );

  const diffMs = startOfToday.getTime() - startOfCreatedDay.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}


export function generateAisleLocations() {
  const locations: string[] = [];
  const firstLetters = ["A", "B", "C"];  // First letter A–C
  const secondLetters = ["A", "B", "C", "D", "E", "F"]; // Second letter A–F

  for (const first of firstLetters) {
    for (const second of secondLetters) {
      for (let num = 1; num <= 4; num++) {
        locations.push(`${first}${second}${num}`);
      }
    }
  }

  return locations;
}

// Usage
export const aisleLocation = generateAisleLocations();

export const demoVendors = ["Ideal Electrical", "Bunnings Warehouse", "Repco", "Mitre 10", "Hammer Hardware", "Toolshed", "Place Makers","Carters","Stihl Shop", "Supercheap Auto"]
export const demoCostCentres = ["Kiwi Rail", "Space X", "Air NZ", "Spark", "OneNZ", "Rocket Lab", "Fisher & Paykel", "Fonterra", "Meridian", "Mainfreight"];
export const demoCustomers =["John Smith", "Ben Fisher", "Chris Luxon", "James Green", "Jim Brown", "Edmund Hillary ", "Elon Musk", "Kate Sheppard", "Kayne West", "Morgan Freeman"]
export const demoStock = [
  {name: "Hammer", brand: "Bahco"},
  {name: "Skrewdriver", brand: "Bahco"},
  {name: "Tape Measure", brand: "Milwaukee"},
  {name: "Power Drill", brand: "Milwaukee"},
  {name: "Socket Set", brand: "Makita"},
  {name: "Crimpers", brand: "Dewalt"},
  {name: "Flush Cutters", brand: "Bacho"},
  {name: "Crowbar", brand: "Bacho"},
  {name: "Multi Tool", brand: "Makita"},
  {name: "Spirit Level", brand: "Bacho"}
];

export const stockFilters = [
    { filter: "out", label: "Out Of Stock" },
    { filter: "low", label: "Low Stock" },
    { filter: "good", label: "In Stock" },
];

export const requestFilters = [
  { filter: "PENDING", label: "Pending" },
  { filter: "READY", label: "Ready" },
  { filter: "COMPLETE", label: "Complete" },
];

export const purchaseFilters = [
    { filter: "PLACED", label: "Placed" },
    { filter: "RECEIVED", label: "Received" },
];

export const financeFilters = [
    { filter: "REQUEST", label: "Request" },
    { filter: "PURCHASE", label: "Purchase" },
];



export function randomInt(min: number, max: number){
  return Math.floor(Math.random() * (max - min + 1)) + min
};

export function pickRandom<T>(array: T[]):T{
  return array[Math.floor(Math.random() * array.length)]
};


export function randomDateWithin(daysBack: number) {
  const date = new Date()
  date.setDate(date.getDate() - randomInt(0, daysBack))
  date.setHours(randomInt(7, 18), randomInt(0, 59))
  return date
}


export function randomDateBetween(start: number, end: number) {
  const now = new Date()

  const randomDaysAgo = randomInt(start, end)

  now.setDate(now.getDate() - randomDaysAgo)
  now.setHours(randomInt(7, 18), randomInt(0, 59))

  return now
}

export function weightedRequestDate() {
  const roll = Math.random()

  if (roll < 0.6) return randomDateWithin(14)   
  if (roll < 0.9) return randomDateWithin(60)  
  return randomDateWithin(180)                  
};

export function weightedRequestStatus() {
  const roll = Math.random()
  if (roll < 0.8) return "COMPLETE"
  if (roll < 0.9) return "READY"
  return "PENDING"
}
export function weightedPurchaseStatus() {
  const roll = Math.random()
  if (roll < 0.1) return "PLACED"
  if (roll < 2.2) return "RECEIVED"

}

export function generatePartNumber(){
  return Math.floor(100000 + Math.random() * 90000).toString();
}