import { getCostCentreFormData } from "@/lib/queries/costCentre";
import UpdateCostCentreForm from "../_components/UpdateCostCentreForm";

export default async function page({params}:
    {params: Promise<{id: string}>}
){

    
      const {id} = await params;

      const details = await getCostCentreFormData(id);
      

         if (!details) return 
    return (
        <div>
            <UpdateCostCentreForm details={details} costCentreId={id}/>
        </div>
    )
}