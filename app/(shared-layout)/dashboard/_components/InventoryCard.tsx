import { buttonVariants } from "@/components/ui/button"
import {
  Card,

  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusCircle } from "@/components/web/StatusCircle";
import { StockOverviewType } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";


type Props = {
    title: string
    values: {quantity: number, reorderPoint: number, name: string}[],
    cardType: StockOverviewType
    href: string,
    description: string

}

export async function InventoryCard({title, values, cardType, href, description }:Props){

  const totalQuantity = values.reduce((sum, item)=>{
return sum + item.quantity
  }, 0);

  

  const generateCardContent = () =>{


  if (totalQuantity < 1){
    return values.length
  } else {
    return totalQuantity
  }
  }





    return (
                <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          <div className="flex items-center gap-2 uppercase">
           <StatusCircle status={cardType}/>
            <p>{title}</p>
    
            </div>
       </CardTitle>
        <CardDescription>
          <p>{description}</p>
          {values.map((value, key)=>{
            return <p className="flex gap-1" key={key}><span className="font-semibold text-white/80">{value.name}</span>{totalQuantity > 1 && "- " + value.quantity + " units"}
            {cardType == "Below reorder point" ? " remaining" : ""}</p>
          })}
 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
      <p>Total: {generateCardContent()}</p>
    

        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
      
            <Link className={cn(buttonVariants({variant: "outline"}),) } href={href}>View stock</Link>
   
      

      </CardFooter>
    </Card>
    )
}