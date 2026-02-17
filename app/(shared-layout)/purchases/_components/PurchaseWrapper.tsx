import { PurchaseStatus } from "@/generated/prisma/enums";
import { getPurchases, getPurchaseStatusCount } from "@/lib/queries/purchase";
import { PurchaseTable } from "./PurchaseTable";
import { Purchasecolumns } from "./PurchaseColumns";

export default async function PurchaseWrapper({filter}:
    {filter: PurchaseStatus}
){

       const [purchases, statusCounts] = await Promise.all([getPurchases(filter), getPurchaseStatusCount()]);

       
     
    return  <PurchaseTable queryCounts={statusCounts} data={purchases} columns={Purchasecolumns} filter={"purchaseNumber"} />
    
}