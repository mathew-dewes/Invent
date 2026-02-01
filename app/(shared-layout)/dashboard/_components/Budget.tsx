

import { getBudgetChartData } from "@/lib/queries/budget";
import BudgetBar from "./BudgetBar";
import { MonthlySpendChart } from "./charts/MonthlySpendChart";





export default async function Budget() {

    const [chartData] = await Promise.all([getBudgetChartData()]);




    

    return (
        <div className="border-2 p-5 rounded-xl bg-secondary lg:col-span-2">
            <h1 className="font-semibold text-xl py-3 ml-1">Budget</h1>
            <BudgetBar />
            <div className="grid grid-cols-3 gap-5 justify-between mt-5">
                <div className="col-span-3">
                    <MonthlySpendChart data={chartData} />


                </div>

     



            </div>




        </div>
    )

}