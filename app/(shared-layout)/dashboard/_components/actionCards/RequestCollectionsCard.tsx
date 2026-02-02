import { buttonVariants } from "@/components/ui/button";
import {
  Card,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { daysAgo } from "@/lib/helpers";

import { cn } from "@/lib/utils";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";

type ActionCardProps = {
  title: string,
  description: string,
  total: number,

  requests: {
    id: string,
    quantity: number,
    customer: string,
    createdAt:Date
    stockItem: {
      name: string,
    
},

  }[]
}

export default function RequestCollectionsCard({
  title,
  requests
}: ActionCardProps) {
  return (
    <Card className="w-full border-l-8 border-b-6 border-l-blue-300 border-b-blue-300 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
        <CircleCheckBig/>
        <p>{title}</p>
          </div>
  
               
        </CardTitle>
        <CardDescription>
          <p>You have outstanding requests waiting for collection</p>


        </CardDescription>
      </CardHeader>
      <CardContent>
 
        <div>
              <div className="flex w-full max-w-lg flex-col gap-2 text-sm">
                {requests.map((request)=>{
                  return (
                  <div className="flex flex-col gap-2" key={request.id}>
            <dl className="flex items-center justify-between">
          <dt>{request.stockItem.name} - x {request.quantity}</dt>
          <dt>{request.customer}</dt>
          <dd className="text-muted-foreground">{daysAgo(request.createdAt)}</dd>
        </dl>
        <Separator />
                  </div>)
                })}
   
      </div>
           
             
            </div>



     

      </CardContent>
      <CardFooter className="flex gap-2">
          <p className="text-sm">View:</p>
        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/requests?status=READY"}>Requests</Link>



      </CardFooter>
      <div/>
    </Card>
  )
}