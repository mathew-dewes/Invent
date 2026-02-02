import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

type Props = {
  percentage: number,
  totalStock: number,
  low: number,
  out: number
}

export default function StockHealthBar({ data }:
  { data: Props }
) {

  function progressColor(progress: number){
    if (progress >= 77){
      return '[&>div]:bg-green-300'
    } else if (progress < 77 && progress > 66) {
      return '[&>div]:bg-yellow-300'
} else if (progress <= 66 && progress >= 33){
    return '[&>div]:bg-orange-300'

} else {
      return '[&>div]:bg-red-300'
}

  }

  return (

    <div className="w-full max-w-sm">
      <Field>
        <FieldLabel htmlFor="progress-upload">
          <span>Inventory level</span>
          <span className="ml-auto">{data.percentage}%</span>
        </FieldLabel>
        <Progress className={progressColor(data.percentage)} value={data.percentage} id="progress-upload" />
      </Field>
      <div className="mt-2 text-sm flex gap-5">
        <p>Total stock: {data.totalStock}</p>
        <p>Low stock: {data.low}</p>
        <p>No stock: {data.out}</p>
      </div>
    </div>

  )
}