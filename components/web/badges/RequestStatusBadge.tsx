
import { Badge } from "@/components/ui/badge";
import { RequestStatus } from "@/lib/types";

import { cn, setStatusColor } from "@/lib/utils";

export default function RequestStatusBadge({ status }: {
    status: RequestStatus
}) {
    return <div>
        <Badge className={cn(setStatusColor(status))}>{status}</Badge>
    </div>
}