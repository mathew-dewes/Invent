import { getPuchaseCardData, getPurchaseChartData } from "@/lib/queries/purchase";
import { PurchaseChart } from "./charts/PurchaseChart";
import PurchaseCard from "./PurchaseCard";
import PurchaseFulfillmentBar from "./PurchaseFulfillmentBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { HighestSpendingTable } from "./tables/HighestSpendingTable";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PurchaseTable from "./tables/PurchaseTable";


export default async function Purchases() {

    const [purchases, chartData] = await Promise.all([getPuchaseCardData(), getPurchaseChartData()]);


    const placedPurchases = purchases.filter((i => i.status === "PLACED"));
    const delayedPurchases = purchases.filter((i => i.status === "DELAYED"));

    const noEntires = placedPurchases.length == 0 && delayedPurchases.length == 0;


    return (
        <div className={`border-2 p-5 rounded-xl bg-secondary flex-1`}>

            <h1 className="font-semibold text-xl py-3 ml-2">Purchases</h1>
            <PurchaseFulfillmentBar />





            <div className="grid grid-cols-2 gap-5 mt-5">
                <div>
                    <PurchaseChart data={chartData} />
                </div>

                <div>
       <PurchaseTable/>

        









                </div>








            </div>

        </div>
    )
}