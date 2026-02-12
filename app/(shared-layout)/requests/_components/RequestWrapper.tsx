import { RequestStatus } from "@/generated/prisma/enums";
import { getRequests, getRequestsByStatusCount } from "@/lib/queries/request";
import { RequestTable } from "./RequestTable";
import { Requestcolumns } from "./RequestColumns";

export default async function RequestWrapper({filter}:
    {filter: RequestStatus}
){
          const [requests, queryCounts] = await Promise.all([getRequests(filter), getRequestsByStatusCount()]);


          console.log(requests[0]);
          

          
    
    return   <RequestTable  queryCounts={queryCounts} data={requests} columns={Requestcolumns} filter={"customer"}/>
    
}