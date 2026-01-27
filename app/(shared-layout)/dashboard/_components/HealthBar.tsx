import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { getStockHealthPercentages } from "@/lib/queries/stock";

export default async function HealthBar(){

  const stockHealth = await getStockHealthPercentages();
    return (
          
          <div className="w-full max-w-sm ml-2">
 <Field>
      <FieldLabel htmlFor="progress-upload">
        <span>Stock Health</span>
        <span className="ml-auto">{stockHealth.percentage}%</span>
      </FieldLabel>
      <Progress value={stockHealth.percentage} id="progress-upload" />
    </Field>
    <div className="mt-2 text-sm flex gap-5">
      <p>Healthy: {stockHealth.percentage}%</p>
      <p>Low: {stockHealth.low}%</p>
      <p>Out: {stockHealth.out}%</p>
    </div>
          </div>
         
    )
}