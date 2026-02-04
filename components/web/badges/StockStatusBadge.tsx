

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StockStatusBadge({ lowStock, quantity, stockOrdered }: {
    lowStock: boolean, quantity: number, stockOrdered: boolean
}) {

    function status() {
        if (stockOrdered && quantity === 0) {
    return { style: "bg-red-400", label: "Ordered" }
        } else if (stockOrdered && lowStock && quantity > 0){
            return { style: "bg-orange-400", label: "Ordered" }
        } else if (lowStock && quantity > 0) {
            return { style: "bg-orange-400", label: "Low Stock" }
        } else if (quantity === 0) {
            return { style: "bg-red-400", label: "Out of stock" }
        } else {
            return { style: "bg-green-400", label: "In Stock" }
        }
    };

    return <div>
        <Badge className={cn(status()?.style, "uppercase font-semibold")}>
            {status()?.label}</Badge>
    </div>
}