
import { CostCentreTable } from "./CostCentreTable";
import { CostCentreColumns } from "./CostCentreColumns";
import { getCostCentres } from "@/lib/queries/costCentre";

export default async function CostCentreWrapper(){

    const costCentres = await getCostCentres();

    console.log(costCentres);
    

    

    
         

    return <CostCentreTable data={costCentres} columns={CostCentreColumns} filter="name"/>
               
}