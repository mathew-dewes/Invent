import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StockOverviewType, StockStatus } from "./types";
import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export function setStatusColor(status: StockStatus | RequestStatus | PurchaseStatus){
   let style;
          switch (status) {
  
              case "PENDING":
         
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
              default:
                  style = 'bg-red-400'
  
          }
  
          return style
  
  

      
}


export function generateStatusColor(status: RequestStatus | StockOverviewType | PurchaseStatus){
        let color;
        
        switch (status) {
            case "COMPLETE":
            case "RECEIVED":
                color = 'bg-green-300'
                break;
            case "Below reorder point":

            case "PENDING":
       
            case "Critical items":
                color = 'bg-orange-400'
                   break;
            case "READY":
            case "PLACED":
                color = 'bg-blue-300'
                    break;
            case "Out of stock":
                color = 'bg-red-400'
                break;
           
        
} 
return color;
}
