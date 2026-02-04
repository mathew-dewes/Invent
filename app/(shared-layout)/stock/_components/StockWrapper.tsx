import { getAllStock, getStockByStatusCount } from "@/lib/queries/stock";
import { StockTable } from "./StockTable";
import { Stockcolumns } from "./Stockcolumns";

export default async function StockWrapper({filter}:
    {filter: string}
){

    const [stock, queryCounts] = await Promise.all([getAllStock(filter), getStockByStatusCount()])

      return <StockTable queryCounts={queryCounts} filter={"name"} columns={Stockcolumns} data={stock} />
      
}