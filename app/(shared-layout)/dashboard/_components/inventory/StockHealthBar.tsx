import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";


type Props = {
    percentage: number,
    totalStock: number,
    good: number,
    low:number,
    out: number
}

export default function StockHealthBar({stockData}:
    {stockData: Props}
){
    return (
                  <Field className="w-1/3">
      <FieldLabel htmlFor="progress-upload">
        <span>Stock Health</span>
        <span className="ml-auto">{stockData.percentage}%</span>
      </FieldLabel>
      <Progress value={stockData.percentage} id="progress-upload" />
        <FieldLabel>
            <div className="flex items-center gap-3 text-sm">

                <p>Total: {stockData.totalStock}</p>
           
 <div className="flex items-center gap-1.5">
                <div className="bg-green-400 rounded-full size-3"/>
                <p>In Stock: {stockData.good}</p>
            </div>
 <div className="flex items-center gap-1.5">
                <div className="bg-orange-400 rounded-full size-3"/>
                <p>Low Stock: {stockData.low}</p>
            </div>
 <div className="flex items-center gap-1.5">
                <div className="bg-red-400 rounded-full size-3"/>
                <p>Out: {stockData.out}</p>
            </div>
            </div>
           

      </FieldLabel>
    </Field>
    )
}