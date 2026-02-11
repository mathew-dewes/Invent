"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";



const stockFilters = [
    { filter: "out", label: "Out Of Stock" },
    { filter: "low", label: "Low Stock" },
    { filter: "good", label: "In Stock" },
]



export default function StockFilters({
  queryCounts = { out: 0, low: 0, good: 0 },
}: {
  queryCounts?: Record<string, number>;
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


    const visibleFilters =  
    stockFilters.filter(f => (queryCounts[f.filter] ?? 0) > 0
      ) || stockFilters;



  function setQueryFilter(term: string, filter: string) {

    if (term === searchParams.get(filter)) {

      return
    }
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(filter, term)
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearQuery() {
    if (!searchParams.get("level")) return
    replace(pathname)
  }




  return (
    <div className="flex gap-4">

      <Button size="sm"

        variant={searchParams.get("level") ? "outline" : "default"}
        onClick={() => clearQuery()}>View All</Button>


      {visibleFilters?.map((filter, key) => {
        const query = filter.filter;
        return <Button size="sm"
          onClick={() => {
            setQueryFilter(query, "level"!)
          }}


          key={key}
          variant={searchParams.get("level"!) !== query ? "outline" : "default"}
        >{filter.label}</Button>
      })}




    </div>

  )
}