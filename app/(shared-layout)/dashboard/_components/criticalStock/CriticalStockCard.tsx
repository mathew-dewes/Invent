import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleAlert, ClipboardClock } from "lucide-react";
import Link from "next/link";
import { CriticalStockDropDown } from "./CriticalStockDropDown";

type Props = {
  title: string,
  description: string,
  incomingPurchases:string[],
  noStockItems: boolean,
  lowStockItems: boolean

  tableData: {
    name: string,
    quantity: number,
    vendor: {
      name: string
    },
    reorderPoint: number,
    id: string

  }[]

}



export default function CriticalStockCard({ title, description, tableData, incomingPurchases, noStockItems, lowStockItems }: Props) {

  const incomingStock = incomingPurchases.length > 0;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-1.5">
            <CircleAlert className="text-red-400" />
            <h1 className="text-lg">{title}</h1>

          </div>
        </CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>

        <Table>
          <TableHeader>
            <TableRow>
              {['Item', 'QTY', 'ROP', 'Vendor'].map((head, key) => {
                return <TableHead key={key}>{head}</TableHead>
              })}



            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => {
          const noStock = incomingPurchases.find((i) => i == item.id);
              return (<TableRow key={item.id}>

                <TableCell>
                  <div className="flex items-center gap-1.5">
             
                
                    <div className={`${item.quantity == 0 ? "bg-red-400" : "bg-orange-400"} rounded-full size-3`} />
                    <p className="font-medium">{item.name} </p>
                  {noStock && <ClipboardClock size={20}/> }
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>{item.vendor.name}</TableCell>
                <TableCell className="flex justify-center">
                  <CriticalStockDropDown stockId={item.id} incomingStock={incomingStock}/>
   

                </TableCell>

              </TableRow>)
            })}



          </TableBody>

        </Table>



      </CardContent>
      <CardFooter>
      

        <div className="flex gap-2 items-center">
          <Link hidden={!noStockItems} className={buttonVariants({ variant: "outline", size: "sm" })} href={'/stock/?level=out'}>View Stock - Out</Link>
          <Link hidden={!lowStockItems} className={buttonVariants({ variant: "outline", size: "sm" })} href={'/stock/?level=low'}>View Stock - low</Link>
        </div>


      </CardFooter>
    </Card>
  )
}