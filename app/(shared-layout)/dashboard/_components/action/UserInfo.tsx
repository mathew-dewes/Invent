import { convertToMoney } from "@/lib/helpers";
import { UserAvatar } from "./UserAvatar";
import { getStockCount, getStockValue } from "@/lib/queries/stock";
import { getUserName } from "@/lib/actions/auth";


export default async function UserInfo(){

    const [stockCount, stockValue, userName] = await Promise.all([getStockCount(), getStockValue(), getUserName()]);

    



    
    return (
          <div className="flex items-center gap-10">
                   
                        {userName && <UserAvatar name={userName}/>}
                
                        <div className="flex gap-4 text-sm">
                       
                        <p><span className="font-semibold">Total units:</span> {stockCount}</p>
                        <p><span className="font-semibold">Stock value:</span> {convertToMoney(stockValue)}</p>
                        </div>
                    
                    </div>
    )
}