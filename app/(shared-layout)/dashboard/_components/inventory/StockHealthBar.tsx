import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";


export default function StockHealthBar({percentage}:
    {percentage: number}
){
    return (
        <Field className="md:w-3/4 ml-1.5 pr-2 md:pr-0 mb-5">
      <FieldLabel htmlFor="progress-upload">
        <span>Stock Health</span>
        <span className="ml-auto">{percentage}%</span>
      </FieldLabel>
      <Progress value={percentage} id="progress-upload" />

    </Field>
    )
}