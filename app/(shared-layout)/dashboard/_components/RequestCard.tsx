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

import { RequestStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
    title: string
    status: RequestStatus
    total: number
    requests:{
      customer: string,
        quantity: number
      stockItem:{name: string}
    }[]
}

export default function RequestCard({title, status, total, requests}:Props){

 
const getCustomers = () => {
  return requests.map((request) => request.customer);
};

const formatNames = (names: string[]) => {
  return names.join(", ");
};

const customers = getCustomers();


  

  
    return (
         <Card className="w-full max-w-sm h-fit">
      <CardHeader>
        <CardTitle className="text-xl">
              <div className="flex items-center gap-2 uppercase">
                        <StatusCircle status={status}/>
                      <p>{title}</p>
              
                      </div>
        </CardTitle>
        <CardDescription>
          <p className="text-white font-semibold">Total: {total}</p>
          <div className="mt-2">
            {requests.splice(0,3)?.map((request, key)=>{
              return <p key={key}>{request.stockItem.name} - x {request.quantity}</p>
            })}
            <p className={`${total <= 3 ? "hidden" : ""}`}>+ {total - 3} more</p>
          </div>
       
        
        
 
        </CardDescription>
      </CardHeader>
      <CardContent>
    
 <p className="text-sm text-muted-foreground">
  <span className="text-white font-medium">Customers:</span> {" "}
  {formatNames(customers.slice(0, 3))}
  {customers.length > 3 && ` and ${customers.length - 3} ${customers.length - 3 == 1 ? "other" : "others"}`}
</p>
   
           
     
   
     
    

       

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
      
            <Link className={cn(buttonVariants({variant: "outline"})) } href={`/requests?status=${status}`}>View requests</Link>
   
      

      </CardFooter>
    </Card>
    )
}