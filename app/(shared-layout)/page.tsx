import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";


export default function HomePage() {
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

        <div className="mt-30">
          <h1 className="text-center text-xl font-semibold">Features</h1>
          <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-10 gap-5 mt-5">
 <Card>
            <CardHeader>
              <CardTitle className="text-center">Inventory Management</CardTitle>
              <CardDescription>Manage your stock levels with ease while being informed on incoming purchases, inventory levels and stock performance. </CardDescription>
            </CardHeader>
   
          </Card>
 <Card>
            <CardHeader>
              <CardTitle className="text-center">Cost Analysis</CardTitle>
              <CardDescription>Get the full financial picture by having the ability to break down the costing of exactly what was requested and purchased.</CardDescription>
            </CardHeader>
   
          </Card>
 <Card>
            <CardHeader>
              <CardTitle className="text-center">Asset Traceability</CardTitle>
              <CardDescription>Keep up to track with who or what cost centre is requesting assets. Whatever arrives or leaves the premises is recorded allowing finance teams to easily charge accordingly. </CardDescription>
            </CardHeader>
   
          </Card>
        
          </div>
         

        </div>

  
                      <Card className="relative mx-auto w-full max-w-sm pt-0 mt-20">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image width={120} height={120} src="https://avatar.vercel.sh/shadcn1"
        alt="Event cover"
        className="relative rounded-t-xl z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle>App Proposal</CardTitle>
        <CardDescription>
          A practical talk on component APIs, accessibility, and shipping
          faster.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View Presentation</Button>
      </CardFooter>
    </Card>
        </div>

            </div>

  )
}