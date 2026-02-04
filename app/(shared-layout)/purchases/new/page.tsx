import { getStockNamesAndQuantity } from "@/lib/queries/stock";
import PurchaseForm from "./_components/purchaseForm";

export default async function Page({searchParams}:
  {searchParams: Promise<{reorder: string}>}
){
  const reorderStockId = ((await searchParams).reorder);

  console.log(reorderStockId);
  
    const stock = await getStockNamesAndQuantity();

    return (
        <div>
            <PurchaseForm stock={stock} reorderStockId={reorderStockId}/>
        </div>
    )
}