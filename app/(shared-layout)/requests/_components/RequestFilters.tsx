"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

const requestFilters = [
  { filter: "OPEN", label: "Open" },
  { filter: "PENDING", label: "Pending" },
  { filter: "READY", label: "Ready" },
  { filter: "COMPLETE", label: "Complete" },
]






export default function RequestFilters({
  queryCounts = { out: 0, low: 0, good: 0 },
}: {
  queryCounts?: Record<string, number>;
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const visibleFilters =
    requestFilters.filter(f => (queryCounts[f.filter] ?? 0) > 0
    ) || requestFilters;



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
    if (!searchParams.get("status")) return
    replace(pathname)
  }




  return (
    <div className="flex gap-4">

      <Button variant={searchParams.get("status") ? "outline" : "default"}
        onClick={() => clearQuery()}>View All</Button>


      {visibleFilters?.map((filter, key) => {
        const query = filter.filter;
        return <Button
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