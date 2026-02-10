import { getStockNamesAndQuantity } from "@/lib/queries/stock";
import EditRequestForm from "./_components/EditRequestForm";
import { getCostCentres } from "@/lib/queries/costCentre";
import { getRequestFormData } from "@/lib/queries/request";


export default async function editRequestPage({params}:
    {params: Promise<{id: string}>}
){

          const {id} = await params;

        const stock = await getStockNamesAndQuantity();
        const costCentres = await getCostCentres();
        const formData = await getRequestFormData(id);

        console.log(formData);
        

        

        if (!costCentres || !formData) return;
        
    return (
        <div>
            <EditRequestForm formData={formData} stock={stock} costCentres={costCentres} requestId={id} />
        </div>
    )
}