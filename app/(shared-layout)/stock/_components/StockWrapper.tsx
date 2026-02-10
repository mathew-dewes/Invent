import { getAllStock, getStockByStatusCount } from "@/lib/queries/stock";
import { StockTable } from "./StockTable";
import { Stockcolumns } from "./Stockcolumns";
import { getUserId } from "@/lib/actions/auth";

export default async function StockWrapper({searchParams}:
  {searchParams: Promise<{level: string}>}){


        const filters = ((await searchParams).level);
        const userId = await getUserId();

    const [stock, queryCounts] = await Promise.all([getAllStock(userId, filters), getStockByStatusCount()])

      return <StockTable queryCounts={queryCounts} filter={"name"} columns={Stockcolumns} data={stock} />
      
}