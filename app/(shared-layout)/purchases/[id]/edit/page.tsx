
import { getStockNames } from "@/lib/queries/stock";
import EditPurchaseForm from "./_components/EditPurchaseForm";
import { getPurchaseById } from "@/lib/queries/purchase";

export default async function page({params}:
    {params: Promise<{id: string}>}
){
      const {id} = await params;

         if (!id) return 
    const stock = await getStockNames();
    const purchase = await getPurchaseById(id);
    

    if (!stock || !purchase) return

    return (
        <div>
            
<EditPurchaseForm stock={stock} values={purchase} purchaseId={id} />
        </div>
    )
}