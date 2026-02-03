import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type Props = {
  title: string,
  description: string,
  headings:string[],
  tableData:{
    name: string,
    quantity: number,
    vendor:{
      name: string
    },
    reorderPoint:number,
    id: string

  }[]

}

export default function CriticalStockCard({title, description, headings, tableData}:Props){
    return (
         <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>

          <Table>
        <TableHeader>
          <TableRow>
            {headings.map((head, key)=>{
              return <TableHead key={key}>{head}</TableHead>
            })}
         


          </TableRow>
        </TableHeader>
        <TableBody>
    {tableData.map((item)=>{
      return (<TableRow key={item.id}>
        
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.reorderPoint}</TableCell>
                <TableCell>{item.vendor.name}</TableCell>
      
              </TableRow>)
    })}
      
           
    
        </TableBody>

      </Table>
   

  
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
    )
}