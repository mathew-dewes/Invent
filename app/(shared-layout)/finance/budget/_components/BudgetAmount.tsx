import { decimalToMoney } from "@/lib/helpers";
import { getBudgetAmount } from "@/lib/queries/budget";

export default async function BudgetAmount(){
     const budgetAmount = await getBudgetAmount();


        if (!budgetAmount) return <p>Please enter an amount</p>
    return (
        <div className="mt-10 flex items-center gap-1">
            <p className="font-semibold">Budget:</p>
      <p>{decimalToMoney(budgetAmount)}</p>
        </div>
   
    )
}