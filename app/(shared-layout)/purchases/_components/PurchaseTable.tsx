import { DataTable } from "@/components/web/tables/DataTable"
import { Purchasecolumns } from "@/components/web/tables/PurchaseColumns"
import { getPurchases } from "@/lib/queries/purchase"

export default async function PurchaseTable(){

    const purchases = await getPurchases()
    return (
        <DataTable filter="PO" columns={Purchasecolumns} data={purchases}/>
    )
}