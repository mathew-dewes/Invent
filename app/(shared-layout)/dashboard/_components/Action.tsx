import { getLowStock } from "@/lib/queries/stock";
import BudgetRiskCard from "./actionCards/BudgetRiskCard";
import DelayedPurchasesCard from "./actionCards/DelayedPurchasesCard";
import LowStockCard from "./actionCards/LowStockCard";
import RequestCollectionsCard from "./actionCards/RequestCollectionsCard";
import { getDelayedPurchases } from "@/lib/queries/purchase";

export default async function Action(){

    const LowStock = await getLowStock();
    const delayedPurchases = await getDelayedPurchases();

    console.log(delayedPurchases);
    


    
    
    
    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary`}>
                  <h1 className="font-semibold text-xl py-3">Actions</h1>

        <div className="grid lg:grid-cols-2 gap-3">
            {LowStock.length > 0 && <LowStockCard title="Low Stock" description="Stock below reorder point" total={LowStock.length} stock={LowStock}/>}
   
            <DelayedPurchasesCard purchases={delayedPurchases} title="Delayed Purchases" description="Stock below reorder point" total={2}/>
            <RequestCollectionsCard title="Request Collections" description="Stock below reorder point" total={8}/>
            <BudgetRiskCard title="Budget risk" description="Stock below reorder point" total={8}/>
                  </div>
   
        </div>
    )
}