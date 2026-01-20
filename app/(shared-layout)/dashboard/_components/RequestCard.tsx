import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusCircle } from "@/components/web/StatusCircle";

import { RequestStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    title: string
    status: RequestStatus
}

export default function RequestCard({title, status}:Props){

  
    return (
         <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle className="text-xl">
              <div className="flex items-center gap-2">
                        <StatusCircle status={status}/>
                      <p>{title}</p>
              
                      </div>
        </CardTitle>
        <CardDescription>
       
             <p className="flex gap-1"><span className="font-semibold text-white/80">hrtrht</span>fe</p>
        
 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
      <p>Total: 11</p>
    

        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
      
            <Link className={cn(buttonVariants({variant: "outline"})) } href={'/'}>View stock</Link>
   
      

      </CardFooter>
    </Card>
    )
}