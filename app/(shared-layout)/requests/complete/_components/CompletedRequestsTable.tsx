import { DataTable } from "@/components/web/tables/DataTable";
import { Requestcolumns } from "@/components/web/tables/RequestColumns";
import { getCompletedRequests } from "@/lib/queries/request";

export default async function CompletedRequestsTable(){

    const requests = await getCompletedRequests();
    return (
        <DataTable filter="customer" columns={Requestcolumns} data={requests}/>
    )
}