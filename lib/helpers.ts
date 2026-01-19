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