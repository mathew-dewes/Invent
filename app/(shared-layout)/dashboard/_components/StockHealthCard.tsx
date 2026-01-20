import { buttonVariants } from "@/components/ui/button"
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


type Props = {
    title: string
    values: {quantity: number, reorderPoint: number, name: string}[],
    cardType: "out" | "low" | "good"
    href: string

}

export async function StockHealthCard({title, values, cardType, href }:Props){

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
                <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>
          {values.map((value, key)=>{
            return <p className="flex gap-1" key={key}><span className="font-semibold text-white/80">{value.name}</span>{totalQuantity > 1 && "- " + value.quantity + " units"}
            {cardType == "low" ? " remaining" : ""}</p>
          })}
 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
      <p>Total: {generateCardContent()}</p>
    

        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2">
      
            <Link className={cn(buttonVariants({variant: "default"}), 'w-full') } href={href}>View stock</Link>
   
      

      </CardFooter>
    </Card>
    )
}