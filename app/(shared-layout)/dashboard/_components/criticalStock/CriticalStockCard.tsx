import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleAlert } from "lucide-react";

import { CriticalStockDropDown } from "./CriticalStockDropDown";
import { ButtonGroup } from "@/components/ui/button-group";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  title: string,
  description: string,
  purchases: string[],
  noStockItems: boolean,
  lowStockItems: boolean,
  tableData: {
    name: string,
    quantity: number,
    purchases?:{
      id: string
    }[],
    vendor: {
      name: string
    },
    reorderPoint: number,
    id: string

  }[]

}



export default function CriticalStockCard({ title, description, tableData, purchases }: Props) {


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
              const noStock = purchases.some((i: string) => i == item.id);

          
        

              return (<TableRow key={item.id}>

                <TableCell>
                  <div className="flex items-center gap-1.5">


                    <div className={`${item.quantity == 0 ? "bg-red-400" : "bg-orange-400"} rounded-full size-3`} />
                    <p className="font-medium">{item.name} </p>
                  </div>
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>{item.vendor.name}</TableCell>
                <TableCell className="flex justify-center">

                  <CriticalStockDropDown incomingStock={noStock} stockId={item.id} />


                </TableCell>

              </TableRow>)
            })}



          </TableBody>

        </Table>



      </CardContent>
      <CardFooter>
        <div>
          <p className="text-muted-foreground text-sm">View stock items of type:</p>
          <ButtonGroup className="mt-3 flex gap-0.5">

            <Link className={buttonVariants({ variant: "default", size: "sm", className: "font-semibold" })} href={'/requests/new'}>Out Stock</Link>
            <Link className={buttonVariants({ variant: "default", size: "sm", className: "font-semibold" })} href={'/purchases/new'}>Low Stock</Link>


          </ButtonGroup>
        </div>


      </CardFooter>

    </Card>
  )
}