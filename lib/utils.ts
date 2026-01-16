import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StockStatus } from "./types";
import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export function setStatusColor(status: StockStatus | RequestStatus | PurchaseStatus){
   let style;
          switch (status) {
  
              case "OPEN":
              case "DELAYED":
              style = "bg-orange-400"
              break;
              case "READY":
              case "PLACED":  
              style = "bg-blue-400"
              break;
            
              case "In Stock":
              case "COMPLETE":
              case "RECEIVED":
                  style = 'bg-green-400'
                  break;
              case 'Low Stock':
              case 'PENDING':
                  style = 'bg-yellow-400'
                  break;
              default:
                  style = 'bg-red-400'
  
          }
  
          return style
  
  

      
}
