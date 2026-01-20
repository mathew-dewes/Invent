
import { InventoryCard } from "./InventoryCard";
import { getStockHealthData, 
  // getTotalStockCount 
} from "@/lib/queries/stock";




export default async function Inventory(){


    const data = await getStockHealthData();
    // const stockCount = await getTotalStockCount();
    

  const outValues = data["out"];
  const lowValues = data["low"];
  const goodValues = data["good"];

    return ( 

    <div className="border-2 p-3 rounded-xl bg-secondary">
<h1 className="font-semibold text-xl py-3 ml-1">Inventory</h1>
        <div className="flex gap-3">
   {goodValues.length > 0 && <InventoryCard cardType="good"  title={"Good"}  values={goodValues} href="/stock?stock=good"/> }
      {lowValues.length > 0 && <InventoryCard cardType="low"  title={"Low stock"} values={lowValues} href="/stock?stock=low"/>}
   {outValues.length > 0 && <InventoryCard cardType="out" title={"Out of stock"}  values={outValues} href="/stock?stock=out"/>}



        
     
        </div>
 
      
    
        

        </div>
 
)
}