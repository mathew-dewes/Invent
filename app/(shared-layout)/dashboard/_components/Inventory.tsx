
import { InventoryCard } from "./InventoryCard";
import { getStockHealthData, 
} from "@/lib/queries/stock";
import HealthBar from "./HealthBar";




export default async function Inventory(){


    const data = await getStockHealthData();
    

  const outValues = data["out"];
  const lowValues = data["low"];
  const goodValues = data["good"];

    return ( 

    <div className="border-2 p-3 rounded-xl bg-secondary">
<h1 className="font-semibold text-xl py-3 ml-1">Inventory</h1>
<HealthBar/>

        <div className="flex gap-3 mt-5">
   {<InventoryCard cardType="good"  title={"Good"}  values={goodValues} href="/stock?stock=good"/> }
      { <InventoryCard cardType="low"  title={"Low"} values={lowValues} href="/stock?stock=low"/>}
   {<InventoryCard cardType="out" title={"Out"}  values={outValues} href="/stock?stock=out"/>}



        
     
        </div>
 
      
    
        

        </div>
 
)
}