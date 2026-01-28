import { DataTable } from "@/components/web/tables/DataTable";
import { Financecolumns } from "@/components/web/tables/FinanceColumns";
import { FinanceType } from "@/generated/prisma/enums";
import { getFinanceData, getFinanceTypeCount } from "@/lib/queries/finance"


export async function FinanceTable({filter}:
     {filter: FinanceType | undefined}){

    const finances = await getFinanceData(filter);
    const financeTypeCount = await getFinanceTypeCount();

    
    
return (
    <div>
    <DataTable queryCounts={financeTypeCount} filter="reference" columns={Financecolumns} data={finances}/>
    </div>
)
}