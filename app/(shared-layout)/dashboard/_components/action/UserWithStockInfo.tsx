
import { UserAvatar } from "./UserAvatar";
import { getStockCount, getStockValue } from "@/lib/queries/stock";
import { convertToMoney } from "@/lib/helpers";
import { getUserName } from "@/lib/actions/auth";

export default async function UserWithStockInfo(){

     const [stockCount, stockValue, userName] = await Promise.all([getStockCount(), getStockValue(), getUserName()]);
    return (
            <div className="items-center gap-5">
                <UserAvatar name={userName ?? "User"}/>
          
                      <div  className="flex md:gap-8 gap-5 mt-3 text-sm lg:text-base">
                                      
                                           <p><span className="font-semibold">Total units:</span> {stockCount}</p>
                                           <p hidden={stockCount == 0}><span className="font-semibold">Stock value:</span> {convertToMoney(stockValue)}</p>
                                          
                                       
                                       </div>
                  
                        </div>
    )
}