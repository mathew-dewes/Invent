import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { StockStatus } from "./types";
import { RequestStatus } from "@/generated/prisma/enums";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};


export function setStatusColor(status: StockStatus | RequestStatus){
   let style;
          switch (status) {
  
              case "OPEN":
              style = "bg-blue-400"
              break;
            
              case "In Stock":
              case "COMPLETE":
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
