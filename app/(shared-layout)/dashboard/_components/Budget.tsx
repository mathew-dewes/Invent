

import { getBudgetChartData, getMonthlyVendorPurchases } from "@/lib/queries/budget";
import BudgetBar from "./BudgetBar";

import { VendorChart } from "./charts/VendorChart";
import { MonthlySpendChart } from "./charts/MonthlySpendChart";





export default async function Budget() {

    const [chartData, vendorData] = await Promise.all([getBudgetChartData(), getMonthlyVendorPurchases()])


    return (
        <div className="border-2 p-5 rounded-xl bg-secondary lg:col-span-2">
            <h1 className="font-semibold text-xl py-3 ml-1">Budget</h1>
            <BudgetBar />
            <div className="grid grid-cols-3 gap-5 justify-between mt-5">
                <div className="col-span-3">
                    <MonthlySpendChart data={chartData} />


                </div>

                {/* <div className="col-span-1">

                    <VendorChart vendors={vendorData ?? []} />

                </div> */}



            </div>




        </div>
    )

}