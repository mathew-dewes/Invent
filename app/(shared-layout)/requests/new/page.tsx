
import { getStockNamesAndQuantity } from "@/lib/queries/stock";
import RequestForm from "./_components/RequestForm";
import { getCostCentres } from "@/lib/queries/costCentre";

export default async function Page(){

    const stock = await getStockNamesAndQuantity();
    const costCentres = await getCostCentres();

    console.log(costCentres);
    
    return (
        <div>
            <RequestForm costCentres={costCentres} stock={stock}/>
        </div>
    )
}