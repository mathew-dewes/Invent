
import { StockHealthCard } from "./StockHealthCard";
import { getStockHealthData, getTotalStockCount } from "@/lib/queries/stock";




export default async function StockHealth(){


    const data = await getStockHealthData();
    const stockCount = await getTotalStockCount();
    

  const outValues = data["out"];
  const lowValues = data["low"];
  const goodValues = data["good"];

    return ( 

    <div className=" mt-3 border-2 p-3 rounded-xl bg-secondary">
<h1 className="font-semibold text-xl py-3 ml-1">Stock Health</h1>
        <div className="flex gap-10">

   {outValues.length > 0 && <StockHealthCard cardType="out" title={"Out Of Stock"}  values={outValues} href="/stock?stock=out"/>}
   {lowValues.length > 0 && <StockHealthCard cardType="low"  title={"Low Stock"} values={lowValues} href="/stock?stock=low"/>}
   {goodValues.length > 0 && <StockHealthCard cardType="good"  title={"Healthy"}  values={goodValues} href="/stock?stock=good"/> }
        
     
        </div>
 
      
    
        

        </div>
 
)
}