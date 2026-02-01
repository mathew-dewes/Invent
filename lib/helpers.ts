import { Prisma } from "@/generated/prisma/client"


export const getFilterKey = (pathname: string) => {
    if (pathname === '/stock') return "stock"
    if (pathname === "/finance") return "type"
    if (pathname === "/requests" || "/purchases") return "status"


}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const stockFilters = [
    { filter: "out", label: "Out Of Stock" },
    { filter: "low", label: "Low Stock" },
    { filter: "good", label: "In Stock" },
]
export const requestFilters = [
    { filter: "OPEN", label: "Open" },
    { filter: "PENDING", label: "Pending" },
    { filter: "READY", label: "Ready" },
    { filter: "COMPLETE", label: "Complete" },
]
export const purchaseFilters = [
    { filter: "PLACED", label: "Placed" },
    { filter: "RECEIVED", label: "Received" },
    { filter: "DELAYED", label: "Delayed" },
];

export const financeFilters = [
    { filter: "REQUEST", label: "Request" },
    { filter: "PURCHASE", label: "Purchase" },
];

export const generateFilters = (pathname: string) => {
    if (pathname === "/stock") {
        return stockFilters
    } else if (pathname === "/requests") {
        return requestFilters
    } else if (pathname === "/purchases") {
        return purchaseFilters
    } else if (pathname === "/finance") {
        return financeFilters
    }
    return []
}


export function decimalToMoney(value: Prisma.Decimal) {
    return new Intl.NumberFormat('en-NZ',
        { style: 'currency', currency: 'NZD' }
    ).format(value.toNumber())
};


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
}



