import { NextResponse } from "next/server";
import { Parser } from "json2csv";
import prisma from "@/lib/prisma";


export async function GET() {
  const ledger = await prisma.costLedger.findMany({
    orderBy: { createdAt: "asc" },
  });

  const data = ledger.map(row => ({
    Date: row.createdAt.toISOString().split("T")[0],
    Type: row.type,
    Reference: row.reference,
    Stock: row.stockName,
    Quantity: row.quantity,
    Plant: row.plantNumber,
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
