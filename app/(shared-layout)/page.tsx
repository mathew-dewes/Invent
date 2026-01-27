import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function HomePage() {

  // Dashboard to go here
  return (
    <div>
      <div className="mt-30">
        <div className="font-bold text-2xl text-center flex flex-col gap-1">
          <h1>Welcome to Invent.</h1>
          <h1>Your go to place for stock management</h1>
        </div>

        <div className="flex justify-center gap-5 mt-8">
          <Link href={'/auth/register'}><Button className="cursor-pointer">Register</Button></Link>
   
          <Link href={'/auth/login'}><Button className="cursor-pointer" variant={"outline"}>Login</Button></Link>
      
        </div>

        <p className="mt-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam veritatis, officiis quod facere tenetur illum explicabo ab cum voluptatibus voluptatem.</p>
      </div>

    </div>
  )
}