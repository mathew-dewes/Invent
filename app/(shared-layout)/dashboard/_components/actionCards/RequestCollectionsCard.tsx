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

import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";
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

export default function RequestCollectionsCard({
  title,
  total,
  details
}: ActionCardProps) {
  return (
    <Card className="w-full border-l-8 border-b-6 border-l-yellow-300 border-b-yellow-300 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
        <CircleAlert/>
        <p>{title} ({total})</p>
          </div>
  
               
        </CardTitle>
        <CardDescription>
          <p>You have outstanding requests waiting for collection</p>


        </CardDescription>
      </CardHeader>
      <CardContent>
 
          <div>
            <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
      <dl className="flex items-center justify-between">
        <dt>Hammer - 2 left</dt>
        <dd className="text-muted-foreground">ROP 5</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Skrew driver - 6 left</dt>
        <dd className="text-muted-foreground">ROP 5</dd>
      </dl>
      <Separator />
      <dl className="flex items-center justify-between">
        <dt>Playstation 5 - 3 left</dt>
        <dd className="text-muted-foreground">ROP 10</dd>
      </dl>
    </div>
            <ul className="list-disc ml-5 mt-1">
     
        
          {details?.map((d, key) => {
              return <li className="tracking-tight text-muted-foreground" key={key}>{d.stockItem.name} x {d.stockItem.quantity}</li>
            })}

            </ul>
           
          </div>



     

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">

        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/stock?stock=low"}>View stock</Link>



      </CardFooter>
      <div/>
    </Card>
  )
}