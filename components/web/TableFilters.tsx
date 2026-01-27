"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { generateFilters, getFilterKey} from "@/lib/helpers";


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


      



  const filters = generateFilters(pathname);

  
      
      function setQueryFilter(term: string, filter: string){
   
   if (term === searchParams.get(filter)){

    return
   }
        const params = new URLSearchParams(searchParams);


   

  
   if (term){
    params.set(filter, term)
   } else {
       params.delete('query');
   }
       replace(`${pathname}?${params.toString()}`);
      }

      function clearQuery(){
        if (!activeQuery) return
        replace(pathname)
      }

     const visibleFilters =  
     pathname === "/stock" || "/requests" || "/purchases" || "/finance" ?

     filters.filter(
        f => (queryCounts[f.filter as keyof typeof queryCounts] ?? 0) > 0
      ): filters;



  

  
      
    return (
        <div className="flex gap-4">
  
             <Button hidden={visibleFilters.length == 0 }
     
           variant={ searchParams.get(filterKey) ? "outline" : "default"}
          onClick={() => clearQuery()}>View All</Button>
        
       
      {visibleFilters?.map((filter, key)=>{     
        const query = filter.filter;
        return   <Button
        onClick={()=>{
        
          setQueryFilter(query, filterKey!)}} 
       

        key={key} 
        variant={ searchParams.get(filterKey!) !== query  ? "outline" : "default"}
        >{filter.label}</Button>
      })}
    

        </div>
   
    )
}