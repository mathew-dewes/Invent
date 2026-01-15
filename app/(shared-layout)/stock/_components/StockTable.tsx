import { DataTable } from "@/components/web/tables/DataTable";
import { Stockcolumns } from "@/components/web/tables/StockColumns";
import { getStock } from "@/lib/queries/stock";

export default async function StockTable(){
    
      const stock = await getStock();

      console.log(stock);
      
    return (
         <DataTable filter="name" columns={Stockcolumns} data={stock} />
    )
}