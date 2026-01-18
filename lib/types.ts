import { PurchaseStatus } from "@/generated/prisma/enums";

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";



export type Stock = {
  id: string
  name: string
  quantity: number
  location: string
  reorderPoint: number,
  maxStock: number,
  vendor: {
    name: string
  },
  brand: string
  unitCost: number
}

export type SingleStockItem = {
   id: string;
    name: string;
    quantity: number;
    location: string;
    brand: string;
    unitCost: number;
    maxStock: number;
    reorderPoint: number;
    partNumber: string
    vendor: {
        name: string;
        id: string
    };
}


export type Vendor = {
  id: string
  name: string
  address: string | null
  phone: string | null
  email: string
  contactName: string
}


export type Request = {
  id: string,
  createdAt: Date,
  requestNumber: number,
  customer: string
  stockItem: {
    id: string
    name: string
    quantity: number
  }
  quantity: number
  plantNumber: string
  note?: string | null
}

export type Purchase = {
  id: string,
  status: PurchaseStatus
  stockItem: { name: string },
  quantity: number
  PO: string
  totalCost: number
}