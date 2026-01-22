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

export default function TableFilters({
  queryCounts = { out: 0, low: 0, good: 0 },
}: {
  queryCounts?: Record<string, number>;
}){
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
          return []
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

     const visibleFilters =  
     pathname === "/stock" || "/requests" || "/purchases" ?

     filters.filter(
        f => (queryCounts[f.filter as keyof typeof queryCounts] ?? 0) > 0
      ): filters;

      const filterLength = visibleFilters.length;


  
      
    return (
        <div className="flex gap-4">
          {filterLength > 1 && <Button variant={activeQuery ? "outline" : "default"} onClick={clearQuery}>All</Button>}

      {visibleFilters.length > 1 && visibleFilters?.map((filter, key)=>{     
        const query = filter.filter;

    
    

        return   <Button 
        onClick={()=>setQueryFilter(query, filterKey!)} 
        key={key} 
        variant={ searchParams.get(filterKey!) !== query  ? "outline" : "default"}
        >{filter.label}</Button>
      })}
    

        </div>
   
    )
}