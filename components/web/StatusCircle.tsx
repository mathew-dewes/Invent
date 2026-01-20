import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
import { InventoryStatus } from "@/lib/types";
import {  generateStatusColor } from "@/lib/utils";



export async function StatusCircle({status}:{status: RequestStatus | InventoryStatus | PurchaseStatus}){

    const color = generateStatusColor(status);
    


    return        <div className={`size-4 ${color} rounded-full`}/>
}