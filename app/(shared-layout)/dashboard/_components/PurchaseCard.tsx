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
import { PurchaseStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    title: string,
    status: PurchaseStatus
    total: number
      purchases:{
        quantity: number
      stockItem:{name: string,
        vendor:{
          name: string
        }
      }
    }[]
}

export default function PurchaseCard({title, status, total, purchases}:Props){


const getVendors = () =>{
  return purchases.map((purchase) => purchase.stockItem.vendor.name)
};

const formatNames = (names: string[]) => {
  return names.join(", ");
};


const vendors = getVendors()



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
        <p className="text-white font-semibold">Total: {total}</p>
          <div className="mt-2">
            {purchases.splice(0,3)?.map((purchase, key)=>{
              return <p key={key}>{purchase.stockItem.name} - x {purchase.quantity}</p>
            })}
            <p className={`${total <= 3 ? "hidden" : ""}`}>+ {total - 3} more</p>
          </div>
 
        </CardDescription>
      </CardHeader>
      <CardContent>
       <p className="text-sm text-muted-foreground">
  <span className="text-white font-medium">Vendors:</span> {" "}
  {formatNames(vendors.slice(0, 3))}
  {vendors.length > 3 && ` and ${vendors.length - 3} ${vendors.length - 3 == 1 ? "other" : "others"}`}
</p>

      </CardContent>


      <CardFooter className="flex-col gap-2 items-start">
      
            <Link className={cn(buttonVariants({variant: "outline"})) } href={`/purchases?status=${status}`}>View Purchases</Link>
   
      

      </CardFooter>
    </Card>
    )
}