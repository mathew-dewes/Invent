
import { Badge } from "@/components/ui/badge";
import { PurchaseStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";




export default function PurchaseStatusBadge({ status }: {
    status: PurchaseStatus
}) {



  

function purchaseStatus(){
     if (status == "RECEIVED"){
        return {style: "bg-green-400", label: "Received"}
} else {
         return {style: "bg-blue-400", label: "Placed"}
}
};
    return <div>
        <Badge className={cn(purchaseStatus().style, "uppercase font-semibold" )}>{purchaseStatus().label}</Badge>
    </div>
}