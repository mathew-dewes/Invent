"use client";

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group";
import { stockFilters } from "@/lib/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";




export function MobileStockFilters({
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
        <div className="flex flex-col items-start gap-8">
      
            <ButtonGroup>
                <Button 
                  
                    variant={searchParams.get("level") ? "outline" : "default"}
                    size="sm" 
                    onClick={()=>{
                        clearQuery()
                    }} >
                    View All
                </Button>
                {visibleFilters.map((filter, key)=>{
                    const query = filter.filter;
                    return <Button 
                    key={key} 
                       variant={searchParams.get("level"!) !== query ? "outline" : "default"}
                    size="sm" 
                    onClick={()=>{
                        setQueryFilter(query, "level");
                    }} >
                    {filter.label}
                </Button>
                })}
               

            </ButtonGroup>


        </div>
    )
}
