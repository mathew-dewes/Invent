
import { Badge } from "@/components/ui/badge";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";




export default function PurchaseStatusBadge({ status }: {
    status: PurchaseStatus
}) {



  

function purchaseStatus(){
     if (status == "RECEIVED"){
        return {style: "bg-green-300", label: "Received"}
} else {
         return {style: "bg-blue-300", label: "Placed"}
}
};
    return <div>
        <Badge className={cn(purchaseStatus().style, "uppercase font-semibold text-black" )}>{purchaseStatus().label}</Badge>
    </div>
}