import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";


type Props = {
  health: number,
  breakdown:{
    received: number,
    placed: number,
  }

}

export default  function PurchaseHealthBar({data}:
  {data: Props}
){

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
        <span>Purchases</span>
        <span className="ml-auto">{data.health}%</span>
      </FieldLabel>
      <Progress className={progressColor(data.health)} value={data.health} id="progress-upload" />
    </Field>
    <div className="mt-2 text-sm flex gap-5">
      <p>Received: {data.breakdown.received}</p>
      <p>Placed: {data.breakdown.placed}</p> 


    </div>
          </div>
         
    )
}