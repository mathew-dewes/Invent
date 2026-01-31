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

export default function OpenRequestsCard({
  title,
  description,
  total,
  details
}: ActionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">


            <div className="flex items-center gap-2">
                  <StatusCircle status="OPEN"/>
          
          
                    <p>{title}</p>
                    </div>


        </CardTitle>
        <CardDescription>
          <p>{description}</p>


        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <p><span className="font-semibold">Total:</span> {total}</p>
          <div className="mt-3">
            <p className="text-sm font-medium">Stock items</p>
            <ul className="list-disc ml-5 mt-1">
        
          {details?.map((d, key) => {
              return <li className="tracking-tight text-muted-foreground" key={key}>{d.stockItem.name} x {d.stockItem.quantity}</li>
            })}

            </ul>
           
          </div>



        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">

        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/requests?status=OPEN"}>View request{total > 1 ? "s" : ""}</Link>



      </CardFooter>
    </Card>
  )
}