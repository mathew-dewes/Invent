
import { getBudgetChartData } from "@/lib/queries/budget";
import BudgetBar from "./BudgetBar";

import { VendorChart } from "./charts/VendorChart";
import { MonthlySpendChart } from "./charts/MonthlySpendChart";



export default async function Budget() {

    const chartData = await getBudgetChartData();



    return (
        <div className="border-2 p-3 rounded-xl bg-secondary">
            <h1 className="font-semibold text-xl py-3 ml-1">Budget</h1>
            <BudgetBar />
            <div className="grid grid-cols-5 gap-5 justify-between mt-5">
                <div className="col-span-3">
                    <MonthlySpendChart data={chartData} />


                </div>

                <div className="col-span-2">

                    <VendorChart />

                </div>



            </div>




        </div>
    )

}