
import { HighestSpendingPlantChart } from "./charts/HighestSpendingPlantChart";
import { MostRequestedItemsChart } from "./charts/MostRequestedItemsChart";
import { HighestSpendingCard } from "./RequestInsightCards/HighestSpendingCard";
import { MostRequestedCard } from "./RequestInsightCards/MostRequestedCard";

export default async function RequestInsight() {


    return (
        <div className="border-2 p-5 rounded-xl bg-secondary">
            <h1 className="font-semibold text-xl py-3 ml-1">Request insights</h1>
            <div className="flex flex-col gap-5">

                <div className="grid grid-cols-10 gap-5">
                    <div className="col-span-6">
                        <HighestSpendingPlantChart />
                    </div>

                    <div className="col-span-4">
                        <HighestSpendingCard />
                    </div>


                </div>

                <div className="grid grid-cols-10 gap-5">

                    <div className="col-span-6">
                        <MostRequestedItemsChart />
                    </div>
                    <div className="col-span-4">
                        <MostRequestedCard />
                    </div>



                </div>




            </div>

        </div>
    )
}