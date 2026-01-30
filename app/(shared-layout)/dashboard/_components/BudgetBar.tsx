import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { decimalToMoney } from "@/lib/helpers";
import { getBudgetAmount, getMonthlyTotalSpend } from "@/lib/queries/budget";
import Link from "next/link";


export default async function BudgetBar(){

    const totalMonthlySpend = await getMonthlyTotalSpend();
    const budgetAmount = await getBudgetAmount();

    if (!totalMonthlySpend){


      return (
      <div>
        <p>Your current spend for this month is zero</p>
        <p>You will need to set a budget, create a vendor and make a purchase for the dashboard to sync</p>
        <div className="mt-2">
          <p>Click the buttons below to redirect</p>
          <div className="mt-2 flex gap-2">
            <Link href={'/finance/budget'}><Button variant={"outline"}>Set Budget</Button></Link>
            <Link href={'/vendors/new'}><Button variant={"outline"}>Create Vendor</Button></Link>
            <Link href={'/purchases/new'}><Button variant={"outline"}>Make Purchase</Button></Link>
     
           
           
          </div>
        </div>
      </div>)
     
    }

  

    if (!budgetAmount) return (
        <div>
        <p className="ml-2">Budget amount unset</p>
        <Button className="mt-3">Set Budget</Button>
        </div>

    );

      const available = budgetAmount?.minus(totalMonthlySpend);
      const remainingPercentage = budgetAmount.equals(0) ? 0 : 
      available.div(budgetAmount).mul(100).toNumber()

    

    
    return (
                  <div className="w-full max-w-sm ml-2">
 <Field>
      <FieldLabel htmlFor="progress-upload">
        <span>Remaining</span>
        <span className="ml-auto">{remainingPercentage.toFixed(1)}%</span>
      </FieldLabel>
      <Progress value={remainingPercentage} id="progress-upload" />
    </Field>
    <div className="mt-2 text-sm flex gap-5">
      <p>Available: {decimalToMoney(available)}</p>
      <p>Total: {decimalToMoney(budgetAmount)}</p>
      <p>Spend: {decimalToMoney(totalMonthlySpend)}</p>
    </div>
          </div>
    )
}