
import { Badge } from "@/components/ui/badge";
import { StockStatus } from "@/lib/types";

import { cn, setStatusColor } from "@/lib/utils";

export default function StockStatusBadge({ status }: {
    status: StockStatus
}) {
    return <div>
        <Badge className={cn(setStatusColor(status))}>{status}</Badge>
    </div>
}