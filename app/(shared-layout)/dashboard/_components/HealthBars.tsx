import { getRequestHealthPercentage } from "@/lib/queries/request";
import PurchaseHealthBar from "./bars/PurchaseHealthBar";
import RequestHealthBar from "./bars/RequestHealthBar";
import StockHealthBar from "./bars/StockHealthBar";
import { getStockHealthPercentages } from "@/lib/queries/stock";
import { getPurchaseHealthPercentage } from "@/lib/queries/purchase";

export default async function HealthBars() {

    const [stockHealth, requestHealth, purchaseHealth] = await Promise.all([getStockHealthPercentages(), getRequestHealthPercentage(), getPurchaseHealthPercentage()])


    return (
        <div className="flex justify-center gap-10">
            <StockHealthBar data={stockHealth} />
            <RequestHealthBar data={requestHealth} />
            <PurchaseHealthBar data={purchaseHealth} />
        </div>
    )
}