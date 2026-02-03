




import { getOpenRequests, getReadyRequests } from "@/lib/queries/request";
import OpenRequestsCard from "./requests/OpenRequestsCard";
import ReadyRequestCard from "./requests/ReadyRequestCard";
import StockHealthBar from "./inventory/StockHealthBar";
import { getStockHealthPercentages } from "@/lib/queries/stock";


export default async function Requests() {

    const [openRequests, readyRequests, stockHealth] = await Promise.all([getOpenRequests(), getReadyRequests(), getStockHealthPercentages()])

    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
            <h1 className="font-semibold text-xl py-3 ml-1">Requests</h1>
                <StockHealthBar stockData={stockHealth}/>

            <div className="grid grid-cols-2 gap-5 mt-5">
    <OpenRequestsCard tableData={openRequests}  headings={['Placed', 'Item', 'QTY', 'Customer', 'Location']} title="Open Requests" description="Items at or below reorder point"/>
    <ReadyRequestCard tableData={readyRequests}  headings={['Customer', 'Item', 'QTY']} title="Ready To Collect" description="Items have been picked and are ready to collect"/>

            </div>
        
                










     

        </div>
    )
}