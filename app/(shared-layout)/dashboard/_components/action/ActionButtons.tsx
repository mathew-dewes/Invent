
import { buttonVariants } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import Link from "next/link"


export default function ActionButtons(){
    return (
  
   
    <ButtonGroup  className="mt-2 flex gap-0.5">

       <Link className={buttonVariants({variant:"default", size:"sm" })} href={'/requests/new'}>Create Request</Link>
       <Link className={buttonVariants({variant:"default", size:"sm" })} href={'/purchases/new'}>Create Purchase</Link>
    

      </ButtonGroup>
 
 
    )
}