import { getRecentActivity } from "@/lib/queries/finance";
import RecentCarousel from "./RecentCarousel";

export default async function RecentActivity(){

    const activities = await getRecentActivity();

    

    
    return(
               <div className="mt-5">
                     <p className="font-semibold">Recent Activity:</p>
                     <div className="mt-2">
         <RecentCarousel activities={activities}/>
                     </div>
                 
                
                 </div>
    )
}