
import { Badge } from "@/components/ui/badge";
import { PurchaseStatus } from "@/generated/prisma/enums";


      const threeDaysAgo = new Date(Date.now() - 72 * 60 * 60 * 1000);

export default function PurchaseStatusBadge({ status, createdAt }: {
    status: PurchaseStatus, createdAt: Date
}) {


    const isDelayed = createdAt.getTime() < threeDaysAgo.getTime();
    

  

function purchaseStatus(){
     if (status == "RECEIVED"){
        return {style: "bg-green-400", label: "Received"}
} else if (isDelayed) {
     return {style: "bg-orange-400", label: "Delayed"}
} else {
         return {style: "bg-blue-400", label: "Placed"}
}
};
    return <div>
        <Badge className={(purchaseStatus().style)}>{purchaseStatus().label}</Badge>
    </div>
}