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
import { CircleAlert } from "lucide-react";
import Link from "next/link";

type ActionCardProps = {
  title: string,
  description: string,
  total: number,

  requests: {
    createdAt: Date,
    id:string,
    quantity: number,
    customer: string,
    stockItem:{
        name: string, 
    }

  }[]
}

export default function OpenRequestsCard({
  title,
  requests
}: ActionCardProps) {



  return (
    <Card className="w-full border-l-8 border-b-6 border-l-yellow-400 border-b-yellow-400 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
            <CircleAlert />
            <p>{title}</p>
          </div>


        </CardTitle>
        <CardDescription>
          <p>You have open requests to pick</p>


        </CardDescription>
      </CardHeader>
      <CardContent>

    
          <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
            {requests?.map((item) => {
              return (
                <div className="flex flex-col gap-2" key={item.id} >
                  <dl className="flex items-center justify-between">
                    <dt>{item.stockItem.name} x {item.quantity}</dt>
                    <dt>{item.customer}</dt>
                    <dt></dt>
                    <dd className="text-muted-foreground">{daysAgo(item.createdAt)}</dd>
                  </dl>
                   <Separator />
                </div>)



            })}
     
          </div>
   

      





      </CardContent>

      <CardFooter className="flex gap-2">
        <p className="text-sm">View:</p>
        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/requests?status=OPEN"}>Open requests</Link>



      </CardFooter>
      <div />
    </Card>
  )
}


