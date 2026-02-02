import { FinanceType, PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";
export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";



export type Stock = {
   unitCost: string;
    id: string;
    name: string;
    quantity: number;
    location: string;
    brand: string;
    reorderPoint: number;
    lowStock:boolean,
    vendor: {
        name: string;
    };
}

export type SingleStockItem = {
  id: string;
  name: string;
  quantity: number;
  location: string;
  brand: string;
  unitCost: string;
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
  customer: string,
  status: RequestStatus
  stockItem: {
    id: string
    name: string
    quantity: number
    reorderPoint: number
  }
  quantity: number
  costCentre: string
  note?: string | null
}

export type SingleRequest = {
   stockItem: {
        quantity: number;
        name: string;
        id: string;
    };
    notes?: string | null;
    quantity: number;
    id: string;
    status: RequestStatus;
    createdAt: Date;
    purchaseNumber?: number;
    PO?: string;
    totalCost?: number;
    customer?:string
    costCentre: string
  
  
}


export type Purchase = {
    id: string;
    status: PurchaseStatus;
    createdAt: Date;
    quantity: number;
    purchaseNumber: number;
    PO: string;
    totalCost: string;
    notes?: string | null
    stockItem: {
        id: string
        name: string;
        quantity: number;
        vendor:{
          name: string
        }
    };
}

export type Finance = {
   totalCost: string;
    id: string;
    createdAt: Date;
    type: FinanceType;
    requestId: string | null;
    purchaseId: string | null;
    stockId: string;
    vendorId: string | null;
    userId: string;
    reference: string;
    plantNumber: string | null;
    stockName: string;
    vendorName: string | null;
    quantity: number;
    unitCost: string;
    month: number;
    year: number;
    requestee: string | null;
}

export type InventoryStatus = "out" | "low" | "good";

export type TimeFrame = "day" | "week" | "month" | "year";


export type StockOverviewType = "Out of stock" | "Below reorder point" | "Critical items"