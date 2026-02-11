import { NextRequest, NextResponse } from "next/server";
import { Parser } from "json2csv";
import prisma from "@/lib/prisma";
import { getStartDate } from "@/lib/helpers";
import { TimeFrame } from "@/lib/types";
import { getUserId } from "@/lib/actions/auth";


export async function GET(req: NextRequest) {

 const { searchParams } = new URL(req.url);
 const userId = await getUserId()

      const timeFrame = searchParams.get("timeFrame") as TimeFrame;

    const startDate = getStartDate(timeFrame)

  const ledger = await prisma.costLedger.findMany({
    where:{
      createdAt:{gte: startDate}, userId
    },
    orderBy: { createdAt: "asc"},
  });

  const data = ledger.map(row => ({
    Date: row.createdAt.toISOString().split("T")[0],
    Type: row.sourceType,
    Reference: row.reference,
    Stock: row.stockName,
    Quantity: row.quantity,
    costCentre: row.costCentreName,
    Vendor: row.vendorName,
    UnitCost: Number(row.unitCost).toFixed(2),
    TotalCost: Number(row.totalCost).toFixed(2),
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="finance-ledger.csv"`,
    },
  });
}
