import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { RequestStatus, StockStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function setStatusColor(status: StockStatus | RequestStatus){
   let style;
          switch (status) {
  
              case "Open":
              style = "bg-blue-400"
              break;
            
              case "In Stock":
              case "Complete":
                  style = 'bg-green-400'
                  break;
              case 'Low Stock':
              case 'Pending':
                  style = 'bg-yellow-400'
                  break;
              default:
                  style = 'bg-red-400'
  
          }
  
          return style
  
  

      
}
