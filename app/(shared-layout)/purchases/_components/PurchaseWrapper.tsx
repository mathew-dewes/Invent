import { PurchaseStatus } from "@/generated/prisma/enums";
import { getPurchases, getPurchaseStatusCount } from "@/lib/queries/purchase";
import { PurchaseTable } from "./PurchaseTable";
import { Purchasecolumns } from "./PurchaseColumns";

export default async function PurchaseWrapper({filter, search}:
    {filter: PurchaseStatus, search: string}
){

       const [purchases, statusCounts] = await Promise.all([getPurchases(filter, search), getPurchaseStatusCount()]);
       
     
    return  <PurchaseTable search={search} queryCounts={statusCounts} data={purchases} columns={Purchasecolumns} filter={{label: "Purchase No", query: "purchaseNumber"}} />
    
}