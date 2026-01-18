import { getVendors } from "@/lib/queries/vendor";
import EditStockForm from "./_components/EditStockForm";
import { getStockById } from "@/lib/queries/stock";


export default async function page({params}:
    {params: Promise<{id: string}>}
){

      const {id} = await params;

         if (!id) return 
    
    const stockItem = await getStockById(id);
    const vendors = await getVendors();

        if (!stockItem || !vendors) return 
    return (
        <div>
            <EditStockForm vendors={vendors} values={stockItem} stockId={id}/>
        </div>
    )
}