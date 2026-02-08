
import { Button } from "@/components/ui/button";
import UserInfo from "./UserInfo";
import { Suspense } from "react";
import Link from "next/link";
import RecentActivity from "./RecentActivity";

export default function ActionBar(){

   
    return (
        <div className="col-span-2 border-2 p-5 rounded-xl bg-secondary">
        <div className="col-span-2 flex justify-between items-center">
            <div className="flex gap-5 items-center">
                <Link href={'/requests/new'}><Button>Create Request</Button></Link>
                <Link href={'/purchases/new'}><Button>Create Purchase</Button></Link>
                <Link href={'/finance'}><Button>View Finances</Button></Link>
 
            
     
            </div>

            <Suspense fallback="Loading...">
 <UserInfo/>
            </Suspense>
       
          
         

        </div>
   <RecentActivity/>
        </div>

    )
}