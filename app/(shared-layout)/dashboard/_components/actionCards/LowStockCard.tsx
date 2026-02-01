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
  stock: {
    name: string,
    quantity: number,
    reorderPoint: number,
    id: string
  }[]
}

export default function LowStockCard({
  title,
  total,
  stock
}: ActionCardProps) {

  return (
    <Card className="w-full border-l-8 border-b-6 border-l-red-400 border-b-red-400 shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2">
            <CircleAlert />
            <p>{title} ({total})</p>
          </div>


        </CardTitle>
        <CardDescription>
          <p>Warning: Items have fell below their reorder points</p>


        </CardDescription>
      </CardHeader>
      <CardContent>

    
          <div className="flex w-full max-w-sm flex-col gap-2 text-sm">
            {stock?.map((item) => {
              return (
                <div className="flex flex-col gap-2" key={item.id} >
                  <dl className="flex items-center justify-between">
                    <dt>{item.name} - {item.quantity} left</dt>
                    <dd className="text-muted-foreground">ROP {item.reorderPoint}</dd>
                  </dl>
                   <Separator />
                </div>)



            })}
     
          </div>
   

      





      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">

        <Link className={cn(buttonVariants({ variant: "outline" }),)} href={"/stock?stock=low"}>View stock</Link>



      </CardFooter>
      <div />
    </Card>
  )
}


