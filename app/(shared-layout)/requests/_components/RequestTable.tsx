import { DataTable } from "@/components/web/tables/DataTable";
import { Requestcolumns } from "@/components/web/tables/RequestColumns";
import { RequestStatus } from "@/generated/prisma/enums";
import { getRequests } from "@/lib/queries/request";

export default async function RequestTable({filter}:
     {filter: RequestStatus | undefined}){
    

    const requests = await getRequests(filter);
    return (
        <DataTable filter="customer" columns={Requestcolumns} data={requests}/>
    )
}