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
    stockItem: {name: string, quantity: number},
    vendor:{name: string}
  }[]
}

export default function DelayedPurchasesCard({
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
        <StatusCircle status="DELAYED"/>


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
            <ul className="list-disc ml-5">
          {details?.map((d, key) => {
              return <li className="tracking-tight text-muted-foreground text-sm" key={key}>
            {d.stockItem.name} - {d.vendor.name}</li>
            })}

            </ul>
           
          </div>



        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">

        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/purchases?status=DELAYED"}>View purchase{total > 1 ? "s" : ""}</Link>



      </CardFooter>
    </Card>
  )
}