import RecentCarousel from "./RecentCarousel";

export default function RecentActivity(){
    return(
               <div className="mt-5">
                     <p className="font-semibold">Recent Activity:</p>
                     <div className="mt-2">
         <RecentCarousel/>
                     </div>
                 
                
                 </div>
    )
}