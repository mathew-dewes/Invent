
import { InventoryCard } from "./InventoryCard";
import {
  getStockHealthData,
} from "@/lib/queries/stock";
import HealthBar from "./HealthBar";




export default async function Inventory() {


  const data = await getStockHealthData();


  const outValues = data["out"];
  const lowValues = data["low"];

  const noAction = outValues.length == 0 && lowValues.length == 0;



  return (

    <div className="border-2 p-5 rounded-xl bg-secondary">
      <h1 className="font-semibold text-xl py-3">Inventory</h1>
      <HealthBar />
      
      {noAction && <div className="mt-6">
        <p>Inventory levels are good. No action required</p>
      </div> }

      <div className={`grid grid-cols-1 gap-3 mt-5 ${noAction ? "hidden": ""}`}>
        {outValues.length != 0 && <InventoryCard description="Stock items with quantity zero" cardType="Out of stock" title={"Out of stock"} values={outValues} href="/stock?stock=out" />}
        {lowValues.length != 0 && <InventoryCard description="Stock items below reorder point" cardType="Critical items" title={"Critical"} values={lowValues} href="/stock?stock=low" />}
  





      </div>





    </div>

  )
}