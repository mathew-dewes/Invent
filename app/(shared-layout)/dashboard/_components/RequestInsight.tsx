
import HightestSpend from "./HighestSpend";
import MostRequested from "./MostRequested";

export default async function RequestInsight() {


    return (
        <div className="border-2 p-5 rounded-xl bg-secondary">
            <h1 className="font-semibold text-xl py-3 ml-1">Insights</h1>
            <div className="flex flex-col gap-5">

                <HightestSpend/>

                <MostRequested/>




            </div>

        </div>
    )
}