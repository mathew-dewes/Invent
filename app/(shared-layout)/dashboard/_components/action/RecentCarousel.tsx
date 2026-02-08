"use client";
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";

export default function RecentCarousel(){
    return (
        <Carousel
            plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
 
     opts={{
        align: "start",
     
      }}
      className="w-1/3"
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-1/1">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center h-0">
                    <p className="text-sm">Mathew Dewes collected 13 x Iphone 17</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
    )
}