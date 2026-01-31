import { buttonVariants } from "@/components/ui/button";
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

type ActionCardProps = {
    title: string,
    description: string
}

export default function ActionCard({
    title,
    description
}: ActionCardProps){
    return (
                       <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">

  
            <p>{title}</p>
    
      
       </CardTitle>
        <CardDescription>
          <p>{description}</p>
          
 
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
      <p>Total: 111</p>
    

        </div>

      </CardContent>
      <CardFooter className="flex-col gap-2 items-start">
      
            <Link className={cn(buttonVariants({variant: "outline"}),) } href={"#"}>View stock</Link>
   
      

      </CardFooter>
    </Card>
    )
}