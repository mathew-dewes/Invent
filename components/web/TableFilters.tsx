"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

const stockFilters = [
    {filter:"out", label: "Out Of Stock"},
    {filter:"low", label: "Low Stock"},
    {filter:"good", label: "In Stock"},



]

export default function TableFilters(){
      const searchParams = useSearchParams();
      const pathname = usePathname();
      const { replace } = useRouter();
 



      function setQueryFilter(term: string, filter: string){
   const params = new URLSearchParams(searchParams);
   console.log(params.toString());
   

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
      <Button onClick={clearQuery}>All</Button>
      {stockFilters.map((filter, key)=>{
        return   <Button 
        onClick={()=>setQueryFilter(filter.filter, 'stock')} 
        key={key} 
        variant={"outline"}
        >{filter.label}</Button>
      })}
    

        </div>
   
    )
}