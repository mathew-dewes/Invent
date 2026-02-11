

import RecentActivity from "./RecentActivity";
import ActionButtons from "./ActionButtons";
import UserWithStockInfo from "./UserWithStockInfo";

export default function ActionBar(){

   
    return (
        <div className="col-span-2 border-2 p-5 rounded-xl bg-secondary">
            <div className="mb-3 flex lg:hidden">
            <UserWithStockInfo/>
            </div>
        <div className="col-span-2 flex gap-30">
            <div>
    <h2 className="font-semibold">Quick actions:</h2>
   <ActionButtons/>
            </div>
            <div className="hidden lg:flex">
      <UserWithStockInfo/>
            </div>
         


        </div>
   <RecentActivity/>
        </div>

    )
}