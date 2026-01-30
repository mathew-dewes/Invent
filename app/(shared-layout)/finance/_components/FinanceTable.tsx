import { DataTable } from "@/components/web/tables/DataTable";
import { Financecolumns } from "@/components/web/tables/FinanceColumns";
import { FinanceType } from "@/generated/prisma/enums";
import { getFinanceData, getFinanceTypeCount } from "@/lib/queries/finance"
import { TimeFrame } from "@/lib/types";


export async function FinanceTable({filter, timeFrame}:
     {filter: FinanceType | undefined, timeFrame: TimeFrame}){

        const [finances, financeTypeCount] = await Promise.all([getFinanceData(filter, timeFrame), getFinanceTypeCount()])

    
    

    
    
return (
    <div>
    <DataTable queryCounts={financeTypeCount} filter="reference" columns={Financecolumns} data={finances}/>
    </div>
)
}