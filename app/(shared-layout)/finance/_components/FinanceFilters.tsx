"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { financeFilters } from "@/lib/helpers";



export default function FinanceFilters({
  queryCounts = { out: 0, low: 0, good: 0 },
}: {
  queryCounts?: Record<string, number>;
}) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const timeRange = searchParams.get("date") ?? "";


  const visibleFilters =
    financeFilters.filter(f => (queryCounts[f.filter] ?? 0) > 0
    ) || financeFilters;



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
    if (!searchParams.get("type")) return
    replace(pathname)
  }

    function clearDateFilter() {
    const params = new URLSearchParams(searchParams);

    if (params.get("date")) {
      params.delete('date');
      replace(`?${params.toString()}`, { scroll: false });
    }


  }




  return (
    <div className="md:flex hidden gap-4">

      <Button size="sm" variant={searchParams.get("type") ? "outline" : "default"}
        onClick={() => clearQuery()}>View All</Button>


      {visibleFilters?.map((filter, key) => {
        const query = filter.filter;
        return <Button size="sm"
          onClick={() => {
            setQueryFilter(query, "type"!)
          }}
          


          key={key}
          variant={searchParams.get("type"!) !== query ? "outline" : "default"}
        >{filter.label}</Button>
      })}

            <div hidden={!pathname.startsWith('/finance')} className="flex items-center gap-2">
        <Select value={timeRange} onValueChange={(value) => setQueryFilter(value, 'date')
        }>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Filter date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup >
              <SelectLabel>Filter date</SelectLabel>
              <SelectItem value="day">Past day</SelectItem>
              <SelectItem value="week">Past week</SelectItem>
              <SelectItem value="month">Past month</SelectItem>
              <SelectItem value="year">Past year</SelectItem>


            </SelectGroup>
          </SelectContent>
        </Select>
        {timeRange && <Button onClick={() => clearDateFilter()} className="cursor-pointer" size={"sm"} variant={"outline"}>Clear date</Button>}
      
      </div>




    </div>

  )
}