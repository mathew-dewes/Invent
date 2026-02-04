
import { getStockNamesAndQuantity } from "@/lib/queries/stock";
import RequestForm from "./_components/RequestForm";

export default async function Page(){

    const stock = await getStockNamesAndQuantity();
    return (
        <div>
            <RequestForm stock={stock}/>
        </div>
    )
}