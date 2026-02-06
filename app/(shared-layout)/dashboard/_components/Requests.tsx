




import { getOpenRequests, getReadyRequests } from "@/lib/queries/request";
import OpenRequestsCard from "./requests/OpenRequestsCard";
import ReadyRequestCard from "./requests/ReadyRequestCard";

import { InventoryTable } from "./inventory/InventoryTable";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";


export default async function Requests() {

    const [openRequests, readyRequests] = await Promise.all([getOpenRequests(), getReadyRequests()])

    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>


            <div className="grid grid-cols-1 gap-5">
    {openRequests.length > 0 && <OpenRequestsCard tableData={openRequests}  headings={['Placed', 'Item', 'QTY', 'Customer', 'Location']} title="Open Requests" description="Items at or below reorder point"/>}
    {readyRequests.length > 0 && <ReadyRequestCard tableData={readyRequests}  headings={['Customer', 'Item', 'QTY']} title="Ready To Collect" description="Items have been picked and are ready to collect"/>}
<div className="mt-2">
    <h2 className="font-semibold text-sm">Latest requests:</h2>
    <Separator  className="mt-2 border"/>
<InventoryTable/>
<Button>View all requests</Button>
</div>

            </div>
        
                










     

        </div>
    )
}