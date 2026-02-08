import { RequestStatus } from "@/generated/prisma/enums";
import { getRequests, getRequestsByStatusCount } from "@/lib/queries/request";
import { RequestTable } from "./RequestTable";
import { Requestcolumns } from "./RequestColumns";

export default async function RequestWrapper({filter}:
    {filter: RequestStatus}
){
          const [requests, queryCounts] = await Promise.all([getRequests(filter), getRequestsByStatusCount()]);

          
    
    return   <RequestTable  queryCounts={queryCounts} data={requests} columns={Requestcolumns} filter={"customer"}/>
    
}