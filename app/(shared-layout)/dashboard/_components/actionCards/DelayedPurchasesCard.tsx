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

type Props = {
  title: string,
  description: string,
  total: number,
  purchases: {
    id: string,
    quantity: number,
    stockItem: {
      name: string
    },
    vendor: { name: string },
    createdAt: Date
  }[]
}

export default function DelayedPurchasesCard({
  title,
  total,
  purchases
}: Props) {
  return (
    <Card className="w-full border-l-8 border-b-6 border-l-orange-400 border-b-orange-400 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
            <CircleAlert />
            <p>{title} ({total})</p>
          </div>


        </CardTitle>
        <CardDescription>
          <p>Purchases item have passed their due dates</p>


        </CardDescription>
      </CardHeader>
      <CardContent>

        <div>
          <div className="flex w-full max-w-lg flex-col gap-2 text-sm">
            {purchases.map((purchase) => {
              return (
                <div className="flex flex-col gap-2" key={purchase.id}>
                  <dl className="flex items-center justify-between">
                    <dt>{purchase.stockItem.name} - x {purchase.quantity}</dt>
                    <dt>{purchase.vendor.name}</dt>
                    <dd className="text-muted-foreground">{daysAgo(purchase.createdAt)}</dd>
                  </dl>
                  <Separator />
                </div>)
            })}

          </div>


        </div>





      </CardContent>
      <CardFooter className="flex gap-2">
        <p>View:</p>

        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/purchases?status=DELAYED"}>Purchases</Link>



      </CardFooter>
      <div />
    </Card>
  )
}