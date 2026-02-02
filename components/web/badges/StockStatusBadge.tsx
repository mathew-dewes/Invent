

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StockStatusBadge({ lowStock , quantity }: {
    lowStock:boolean ,quantity: number
}) {
 
function status(){
     if (lowStock && quantity > 0){
        return {style: "bg-orange-400", label: "Low Stock"}
} else if (quantity === 0) {
     return {style: "bg-red-400", label: "Out of stock"}
} else {
     return {style: "bg-green-400", label: "In Stock"}
}
};

    return <div>
        <Badge className={cn(status()?.style, "uppercase font-semibold")}>{status()?.label}</Badge>
    </div>
}