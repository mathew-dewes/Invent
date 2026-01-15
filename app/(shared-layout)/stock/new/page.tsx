import { getVendors } from "@/lib/queries/vendor";
import StockForm from "./_components/StockForm";

export default async function Page(){
  const vendors = await getVendors();

  console.log(vendors);
    return (
        <div>
            <StockForm vendors={vendors}/>
        </div>
    )
}