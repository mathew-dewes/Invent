import { convertToMoney } from "@/lib/helpers";

import { getStockCount, getStockValue } from "@/lib/queries/stock";

export default async function StockInfo(){

    const [stockCount, stockValue] = await Promise.all([getStockCount(), getStockValue()]);

    



    
    return (
          <div className="flex items-center gap-10 mt-5">
                   
              
                
                        <div className="flex gap-4 text-sm">
                       
                        <p><span className="font-semibold">Total units:</span> {stockCount}</p>
                        <p><span className="font-semibold">Stock value:</span> {convertToMoney(stockValue)}</p>
                        </div>
                    
                    </div>
    )
}