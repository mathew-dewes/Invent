
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/generated/prisma/enums";



export default function RequestStatusBadge({ status }: {
    status: RequestStatus
}) {

function requestStatus(){
     if (status == "COMPLETE"){
        return {style: "bg-green-400", label: "Complete"}
} else if (status == "OPEN") {
     return {style: "bg-orange-400", label: "Open"}
} else {
     return {style: "bg-blue-400", label: "Ready"}
}
};
    return <div>
        <Badge className={(requestStatus().style)}>{requestStatus().label}</Badge>
    </div>
}