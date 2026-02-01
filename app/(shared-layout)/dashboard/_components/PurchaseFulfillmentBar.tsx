
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";


export default function PurchaseFulfillmentBar(){
          return (
<div className="w-full max-w-sm ml-2">
 <Field>
      <FieldLabel htmlFor="progress-upload">
        <span>Order fulfillment</span>
        <span className="ml-auto">78%</span>
      </FieldLabel>
      <Progress value={78} id="progress-upload" />
    </Field>
    <div className="mt-2 text-sm flex gap-5">
    
    </div>
          </div>)
}