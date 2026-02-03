
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/generated/prisma/enums";
import { cn } from "@/lib/utils";



export default function RequestStatusBadge({ status }: {
    status: RequestStatus
}) {

function requestStatus(){
     if (status == "COMPLETE"){
        return {style: "bg-green-400", label: "Complete"}
} else if (status == "OPEN") {
     return {style: "bg-yellow-200 text-black", label: "Open"}
} else {
     return {style: "bg-blue-400", label: "Ready"}
}
};
    return <div>
        <Badge className={cn(requestStatus().style, " font-semibold")}>{requestStatus().label}</Badge>
    </div>
}