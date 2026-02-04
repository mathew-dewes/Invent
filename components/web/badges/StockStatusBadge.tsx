

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StockStatusBadge({ quantity, stockOrdered, reorderPoint }: {
     quantity: number, stockOrdered: boolean, reorderPoint: number
}) {

    function status() {
        if (stockOrdered && quantity === 0) {
    return { style: "bg-red-400", label: "Ordered" }
        } else if (stockOrdered && quantity <= reorderPoint && quantity > 0){
            return { style: "bg-orange-400", label: "Ordered" }
        } else if (quantity <= reorderPoint  && quantity > 0) {
            return { style: "bg-orange-400", label: "Low Stock" }
        } else if (quantity === 0) {
            return { style: "bg-red-400", label: "Out of stock" }
        } else {
            return { style: "bg-green-400", label: "In Stock" }
        }
    };

    return <div>
        <Badge className={cn(status().style)}>
            {status().label}</Badge>
    </div>
}