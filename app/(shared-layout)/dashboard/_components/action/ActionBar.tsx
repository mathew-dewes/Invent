
import { Button } from "@/components/ui/button";
import UserInfo from "./StockInfo";
import { Suspense } from "react";
import Link from "next/link";
import RecentActivity from "./RecentActivity";
import { UserAvatar } from "./UserAvatar";

export default function ActionBar(){

   
    return (
        <div className="col-span-2 border-2 p-5 rounded-xl bg-secondary">
        <div className="col-span-2 flex justify-between lg:items-center lg:flex-row flex-col">
            <div className="grid grid-cols-2 sm:flex gap-5 sm:justify-start">
                <Link href={'/requests/new'}><Button size={"sm"}>Create Request</Button></Link>
                <Link href={'/purchases/new'}><Button size={"sm"}>Create Purchase</Button></Link>
                <Link href={'/finance'}><Button size={"sm"}>View Finances</Button></Link>
                <div className="sm:flex hidden">
                      <UserAvatar name={'Mathew Dewes'}/>
                </div>
              
                
 
            
     
            </div>

            <Suspense fallback="Loading...">
 <UserInfo/>
            </Suspense>
       
          
         

        </div>
   <RecentActivity/>
        </div>

    )
}