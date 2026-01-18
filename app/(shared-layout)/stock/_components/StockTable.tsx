import { DataTable } from "@/components/web/tables/DataTable";
import { Stockcolumns } from "@/components/web/tables/StockColumns";
import { getAllStock } from "@/lib/queries/stock";

export default async function StockTable(){
    
      const stock = await getAllStock();
      
    return (
         <DataTable filter="name" columns={Stockcolumns} data={stock} />
    )
}