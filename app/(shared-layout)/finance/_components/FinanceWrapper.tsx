import { FinanceType } from "@/generated/prisma/enums";
import { getFinanceData, getFinanceTypeCount } from "@/lib/queries/finance";
import { TimeFrame } from "@/lib/types";
import { FinanceTable } from "./FinanceTable";
import { Financecolumns } from "./FinanceColumns";

export default async function FinanceWrapper({filter, timeFrame}:
    {filter: FinanceType, timeFrame: TimeFrame}
){
     
const [finances, financeTypeCount] = await Promise.all([getFinanceData(filter, timeFrame), getFinanceTypeCount()]);






    return   <FinanceTable queryCounts={financeTypeCount} data={finances} columns={Financecolumns} filter={{label: "reference", source: "reference"}} />
       
}