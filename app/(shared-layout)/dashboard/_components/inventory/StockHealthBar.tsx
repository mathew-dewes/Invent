import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";


export default function StockHealthBar({percentage}:
    {percentage: number}
){
    return (
        <Field className="w-100 ml-1.5 mb-5">
      <FieldLabel htmlFor="progress-upload">
        <span>Stock Health</span>
        <span className="ml-auto">{percentage}%</span>
      </FieldLabel>
      <Progress value={percentage} id="progress-upload" />

    </Field>
    )
}