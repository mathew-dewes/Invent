
import { buttonVariants } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import Link from "next/link"


export default function ActionButtons(){
    return (
  
   
      <ButtonGroup className="mt-2">

       <Link className={buttonVariants({variant:"outline"})} href={'/requests/new'}>Create Request</Link>
       <Link className={buttonVariants({variant:"outline"})} href={'/purchases/new'}>Create Purchase</Link>
    

      </ButtonGroup>
 
 
    )
}