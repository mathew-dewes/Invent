import { Prisma } from "@/generated/prisma/client"
import { StockStatus } from "./types"

export function generateStockStatus(currentStock: number, reorderPointAmount: number): StockStatus {

    if (currentStock === 0) {
        return "Out of Stock"
    }

    else if (currentStock < reorderPointAmount) {
        return "Low Stock"
    } else {
        return "In Stock"
    }

}

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


type ChartPoint = {
  date: string;
  spend: number;
};

type Purchase = {
  createdAt: Date;
  totalCost: Prisma.Decimal;
};


export function buildSpendChartData(purchases:Purchase[]): ChartPoint[]{

    const map = new Map<string, Prisma.Decimal>();

    for (const p of purchases){
        const dataKey = p.createdAt.toISOString().split("T")[0];

        const existing = map.get(dataKey) ?? new Prisma.Decimal(0);
        map.set(dataKey, existing.plus(p.totalCost));
    }

    return Array.from(map.entries()).
    sort((a, b) => a[0].localeCompare(b[0])).map(([date, total])=>({
        date,
        spend: total.toNumber()
    }))



}