import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { convertToMoney } from "@/lib/helpers"



type tableProps = {
  customer: string,
  costCentre: string,
  spend: number
}[]

export function HighestSpendingTable({tableData}:{tableData: tableProps}) {
  return (
    <Table>
      <TableCaption>Top spending customers.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-25">Name</TableHead>
          <TableHead>Cost centre</TableHead>
       
          <TableHead className="text-right">Spend</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((data, key) => (
          <TableRow key={key}>
            <TableCell className="font-medium">{data.customer}</TableCell>
            <TableCell>{data.costCentre}</TableCell>
            <TableCell className="text-right">{convertToMoney(data.spend)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
  
    </Table>
  )
}
