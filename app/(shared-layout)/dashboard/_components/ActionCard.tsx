import { buttonVariants } from "@/components/ui/button";
import {
  Card,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import Link from "next/link";

type ActionCardProps = {
    title: string,
    description: string,
    total: number,
    details?: {
        stockItem: {
        name: string,
        quantity: number
  
      }
    }[]
}

export default function ActionCard({
    title,
    description,
    total,
    details
}: ActionCardProps){
    return (
                       <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">

  
            <p>{title}</p>
    
      
       </CardTitle>
        <CardDescription>
          <p>{description}</p>
          
 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
      <p>Total: {total}</p>
      <div className="mt-3">
        <p>Items to pick:</p>
        {details?.map((d, key)=>{
          return   <p key={key}>{d.stockItem.name} x {d.stockItem.quantity}</p>
        })}

      </div>
    
    

        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
      
            <Link className={cn(buttonVariants({variant: "outline"}),) } href={"#"}>View stock</Link>
   
      

      </CardFooter>
    </Card>
    )
}