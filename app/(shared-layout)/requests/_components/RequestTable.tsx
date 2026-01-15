import { DataTable } from "@/components/web/tables/DataTable";
import { Requestcolumns } from "@/components/web/tables/RequestColumns";
import { getRequests } from "@/lib/queries/request";

export default async function RequestTable(){

    const requests = await getRequests()
    return (
        <DataTable filter="customer" columns={Requestcolumns} data={requests}/>
    )
}