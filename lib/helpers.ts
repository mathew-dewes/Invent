import { StockStatus } from "./types"

export function generateStockStatus(currentStock: number, reorderPointAmount: number) :StockStatus {

    if (currentStock === 0) {
        return "Out of Stock"
    }

    else if (currentStock < reorderPointAmount) {
        return "Low Stock"
    } else {
        return "In Stock"
    }

}

export const getFilterKey = (pathname: string) =>{
        if (pathname ==='/stock') return "stock"
        if (pathname ==="/requests" || "/purchases") return "status"

      }

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const stockFilters = [
    {filter:"out", label: "Out Of Stock"},
    {filter:"low", label: "Low Stock"},
    {filter:"good", label: "In Stock"},
]
export const requestFilters = [
    {filter:"OPEN", label: "Open"},
    {filter:"PENDING", label: "Pending"},
    {filter:"READY", label: "Ready"},
    {filter:"COMPLETE", label: "Complete"},
]
export const purchaseFilters = [
    {filter:"PLACED", label: "Placed"},
    {filter:"RECEIVED", label: "Received"},
    {filter:"DELAYED", label: "Delayed"},
];

export const generateFilters = (pathname: string) =>{
          if (pathname === "/stock"){
            return stockFilters
          } else if (pathname === "/requests"){
            return requestFilters
          } else if (pathname === "/purchases"){
            return purchaseFilters
          }
          return []
      }