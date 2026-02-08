"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";


const purchaseFilters = [
    { filter: "PLACED", label: "Placed" },
    { filter: "RECEIVED", label: "Received" },
    { filter: "DELAYED", label: "Delayed" },
];





export default function PurchaseFilters({
  queryCounts = { out: 0, low: 0, good: 0 },
}: {
  queryCounts?: Record<string, number>;
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  


  const visibleFilters =
    purchaseFilters.filter(f => (queryCounts[f.filter] ?? 0) > 0
    ) || purchaseFilters;



  function setQueryFilter(term: string, filter: string) {
    if (term === searchParams.get(filter)) return
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(filter, term);
      params.delete("search");
    } else {
      params.delete(filter);
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearQuery() {
    if (!searchParams.get("status")) return
    replace(pathname)
  }




  return (
    <div className="flex gap-4">

      <Button size="sm"  variant={searchParams.get("status") ? "outline" : "default"}
        onClick={() => clearQuery()}>View All</Button>


      {visibleFilters?.map((filter, key) => {
        const query = filter.filter;
        return <Button size="sm"
          onClick={() => {
            setQueryFilter(query, "status"!)
          }}


          key={key}
          variant={searchParams.get("status"!) !== query ? "outline" : "default"}
        >{filter.label}</Button>
      })}




    </div>

  )
}