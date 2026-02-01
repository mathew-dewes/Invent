
import { Badge } from "@/components/ui/badge";
import { PurchaseStatus } from "@/generated/prisma/enums";


export default function PurchaseStatusBadge({ status }: {
    status: PurchaseStatus
}) {

function purchaseStatus(){
     if (status == "RECEIVED"){
        return {style: "bg-green-400", label: "Received"}
} else if (status == "DELAYED") {
     return {style: "bg-orange-400", label: "Delayed"}
} else {
     return {style: "bg-blue-400", label: "Placed"}
}
};
    return <div>
        <Badge className={(purchaseStatus().style)}>{purchaseStatus().label}</Badge>
    </div>
}