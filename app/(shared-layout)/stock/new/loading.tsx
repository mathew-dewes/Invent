import { Skeleton } from "@/components/ui/skeleton";
import LoadingSpinner from "@/components/web/LoadingSpinner";

export default function LoadingPage(){
    return (
        <div className="w-full max-w-xl mx-auto mt-15 relative" >
            <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <LoadingSpinner text="Getting form ready..."/>
            </div>
  
            <Skeleton className="w-full h-200 mb-8 rounded-xl"/>

    
        </div>
    )
}