import { DataTable } from "@/components/web/tables/DataTable";
import { Stockcolumns } from "@/components/web/tables/StockColumns";
import { getAllStock } from "@/lib/queries/stock";

export default async function StockTable({filter}:
     {filter: string | undefined}
){
    
      const stock = await getAllStock(filter);
      
    return (
         <DataTable filter="name" columns={Stockcolumns} data={stock} />
    )
}