"use client";
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { FinanceType } from "@/generated/prisma/enums";
import { convertToMoney, daysAgo } from "@/lib/helpers";
import { Box, ClipboardCheck, ClipboardCopy, ShoppingBag } from "lucide-react";



type ActivityType = {
  activities?: {
    id: string,
    createdAt: Date,
    sourceType: FinanceType,
    reference: string,
    stockName: string,
    quantity: number,
    costCentre: string,
    totalCost: number,
    vendorName: string | null,
  }[]
}

export default function RecentCarousel({ activities }: ActivityType) {
  return (
    <Carousel

      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}

      opts={{
        align: "start",

      }}
      className="w-1/3"
    >
      <CarouselContent>
        {activities?.map((activity, index) => {

          const createdAt = new Date(activity.createdAt).toLocaleString("en-NZ", {

            hour: "2-digit",
            minute: "2-digit"
          })
          return <CarouselItem key={index} className="basis-1/1 text-sm">
            <div className="p-1">
              {activity.sourceType == "REQUEST" ? <Card>
                <CardContent>
                  <div>
                    <p>{daysAgo(activity.createdAt)} {daysAgo(activity.createdAt) === "Today" && createdAt}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      <div className="flex gap-1.5 items-center">
                        <ClipboardCheck  size={20} className="text-green-300"  />
                        <p><span className="font-semibold">{activity?.sourceType}:</span> #{activity.reference}</p>
                      </div>

                      <p><span className="font-semibold">Issued:</span> {activity.quantity} x {activity.stockName}</p>
                      <p><span className="font-semibold">Charged to:</span> {activity.costCentre} - total: {convertToMoney(activity.totalCost)} </p>
                    </div>
                  </div>


                  <p></p>


                </CardContent>
              </Card> : <Card>
                <CardContent>


                  <div>
                    <p>{daysAgo(activity.createdAt)} {daysAgo(activity.createdAt) === "Today" && createdAt}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      <div className="flex gap-1 items-center">
                       <Box size={20} className="text-blue-300" />
                        <p><span className="font-semibold">{activity?.sourceType}:</span> #{activity.reference}</p>
                      </div>

                      <p><span className="font-semibold">Ordered:</span> {activity.quantity} x {activity.stockName} from {activity.vendorName}</p>
                      <p><span className="font-semibold">total:</span> {convertToMoney(activity.totalCost)}</p>
                    </div>
                  </div>





                </CardContent>
              </Card>}

            </div>
          </CarouselItem>
        })}
      </CarouselContent>
    </Carousel>
  )
}