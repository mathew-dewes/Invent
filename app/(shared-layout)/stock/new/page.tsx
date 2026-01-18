import { getVendors } from "@/lib/queries/vendor";
import StockForm from "./_components/StockForm";

export default async function Page(){

    
  const vendors = await getVendors();

    return (
        <div>
            <StockForm vendors={vendors}/>
        </div>
    )
}