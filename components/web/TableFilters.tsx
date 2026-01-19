"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { getFilterKey } from "@/lib/helpers";

const stockFilters = [
    {filter:"out", label: "Out Of Stock"},
    {filter:"low", label: "Low Stock"},
    {filter:"good", label: "In Stock"},
]
const requestFilters = [
    {filter:"OPEN", label: "Open"},
    {filter:"PENDING", label: "Pending"},
    {filter:"READY", label: "Ready"},
    {filter:"COMPLETE", label: "Complete"},
]
const purchaseFilters = [
    {filter:"PLACED", label: "Placed"},
    {filter:"RECEIVED", label: "Received"},
    {filter:"DELAYED", label: "Delayed"},
];

export default function TableFilters(){
      const searchParams = useSearchParams();
      const pathname = usePathname();
      const { replace } = useRouter();
      const filterKey = getFilterKey(pathname);
      if (pathname.startsWith("/vendors") || !filterKey) return;

      const activeQuery = !!searchParams.get(filterKey);

      

      const generateFilters = (pathname: string) =>{
          if (pathname === "/stock"){
            return stockFilters
          } else if (pathname === "/requests"){
            return requestFilters
          } else if (pathname === "/purchases"){
            return purchaseFilters
          }
      }

  const filters = generateFilters(pathname);
      
      function setQueryFilter(term: string, filter: string){
   const params = new URLSearchParams(searchParams);

  
   if (term){
    params.set(filter, term)
   } else {
       params.delete('query');
   }
       replace(`${pathname}?${params.toString()}`);
      }

      function clearQuery(){
        replace(pathname)
      }



      
    return (
        <div className="flex gap-4">
      <Button variant={activeQuery ? "outline" : "default"} onClick={clearQuery}>All</Button>
      {filters?.map((filter, key)=>{
        return   <Button 
        onClick={()=>setQueryFilter(filter.filter, filterKey!)} 
        key={key} 
        variant={ filter.filter !== searchParams.get(filterKey!) ? "outline" : "default"}
        >{filter.label}</Button>
      })}
    

        </div>
   
    )
}