"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation";


const stockFilters = [
    { filter: "out", label: "Out Of Stock" },
    { filter: "low", label: "Low Stock" },
    { filter: "good", label: "In Stock" },
]


export function MobileStockFilter({
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


 <Select onValueChange={(value) => {
    if (value === "all") {
      clearQuery()
    } else {
      setQueryFilter(value, "level")
    }
  }}>
      <SelectTrigger>
        <SelectValue placeholder="Filter level" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Filter</SelectLabel>
          <SelectItem value="all">View All</SelectItem>
          {visibleFilters.map((filter, key)=>{
            return <SelectItem  key={key} value={filter.filter}>{filter.label}</SelectItem>
          })}
   
  
        
        </SelectGroup>
      </SelectContent>
    </Select>
   
   
  )
}
