import { DataTable } from "@/components/web/tables/DataTable";
import { Requestcolumns } from "@/components/web/tables/RequestColumns";
import { RequestStatus } from "@/generated/prisma/enums";
import { getRequests, getRequestsByStatusCount } from "@/lib/queries/request";

export default async function RequestTable({filter}:
     {filter: RequestStatus | undefined}){

        const [requests, statusCounts] = await Promise.all([getRequests(filter), getRequestsByStatusCount()])

    return (
        <div>
  <DataTable filter="customer" columns={Requestcolumns} data={requests} queryCounts={statusCounts}/>
   
        </div>
      
    )
}