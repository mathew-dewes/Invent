import { getStockNameAndQuantityById } from "@/lib/queries/stock";
import EditQuantityForm from "./_components/EditQuantityForm";

export default async function page({params}:
    {params: Promise<{id: string}>}
){
   const {id} = await params;
    const stockItem = await getStockNameAndQuantityById(id);

    if (!id || !stockItem) return
    
return (
    <div>
        <EditQuantityForm stockId={id} stockName={stockItem.name} stockQuantity={stockItem?.quantity}/>
    </div>
)
}