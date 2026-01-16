import { getStockNames } from "@/lib/queries/stock";
import PurchaseForm from "./_components/purchaseForm";
import { getVendorNames } from "@/lib/queries/vendor";

export default async function Page(){

    const stock = await getStockNames();
    const vendors = await getVendorNames()
    return (
        <div>
            <PurchaseForm stock={stock} vendors={vendors}/>
        </div>
    )
}