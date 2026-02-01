import { DataTable } from "@/components/web/tables/DataTable"
import { Purchasecolumns } from "@/components/web/tables/PurchaseColumns"
import { PurchaseStatus } from "@/generated/prisma/enums"
import { getPurchases, getPurchaseStatusCount } from "@/lib/queries/purchase"

export default async function PurchaseTable({filter}:
     {filter: PurchaseStatus | undefined}){

        const [purchases, statusCounts] = await Promise.all([getPurchases(filter), getPurchaseStatusCount()])
    
    return (
        <DataTable queryCounts={statusCounts} filter="PO" columns={Purchasecolumns} data={purchases}/>
    )
}