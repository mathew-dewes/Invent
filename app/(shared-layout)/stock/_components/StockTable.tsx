
import { DataTable } from "@/components/web/tables/DataTable";
import { Stockcolumns } from "@/components/web/tables/StockColumns";
import { getAllStock, getStockByStatusCount } from "@/lib/queries/stock";
import { Stock } from "@/lib/types";

export default async function StockTable({ filter }:
     { filter: string | undefined }
) {

     const stock = await getAllStock(filter) as Stock[];
     const statusCounts = await getStockByStatusCount();




     return (
          <DataTable filter="name" columns={Stockcolumns} data={stock} queryCounts={statusCounts} />
          

     )
}