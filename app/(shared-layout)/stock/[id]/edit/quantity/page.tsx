import { getStockNameAndQuantityById } from "@/lib/queries/stock";
import UpdateQuantityForm from "./_components/UpdateQuantityForm";

export default async function page({params}:
    {params: Promise<{id: string}>}
){
   const {id} = await params;
    const stockItem = await getStockNameAndQuantityById(id);

    if (!id || !stockItem) return
    
return (
    <div>
        <UpdateQuantityForm stockId={id} stockName={stockItem.name} stockQuantity={stockItem?.quantity}/>
    </div>
)
}