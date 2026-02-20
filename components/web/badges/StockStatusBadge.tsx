

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StockStatusBadge({ quantity, reorderPoint }: {
     quantity: number, reorderPoint: number
}) {

    function status() {
        if (quantity <= reorderPoint / 2) {
    return { style: "bg-red-400", label: "Critical" }
        } else if (quantity < reorderPoint  && quantity > 0) {
            return { style: "bg-yellow-200", label: "Low Stock" }
        } else if (quantity === 0) {
            return { style: "bg-red-300", label: "Out of stock" }
        } else {
            return { style: "bg-green-300", label: "In Stock" }
        }
    };

    return <div>
        <Badge className={cn(status().style,"text-black")}>
            {status().label}</Badge>
    </div>
}