import { Skeleton } from "@/components/ui/skeleton";


export default function TableSkeleton(){
    return (

    
  <div className="flex flex-col gap-5 w-full my-8">

        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-7/8" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-6/8" />
        <Skeleton className="h-4 w-full" />
     
   
    </div>
     
       
    )
}

