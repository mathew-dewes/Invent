import { PurchaseStatus, RequestStatus } from "@/generated/prisma/enums";

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
  customer: string,
  status: RequestStatus
  stockItem: {
    id: string
    name: string
    quantity: number
  }
  quantity: number
  plantNumber: string
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
    plantNumber?: string
  
  
}


export type Purchase = {
    id: string;
    status: PurchaseStatus;
    createdAt: Date;
    quantity: number;
    purchaseNumber: number;
    PO: string;
    totalCost: number;
    notes?: string | null
    stockItem: {
        id?: string
        name: string;
        quantity: number;
    };
}

//  id: string;
//     createdAt: Date;
//     PO: string;
//     purchaseNumber: number;
//     status: PurchaseStatus;
//     quantity: number;
//     totalCost: Decimal;
//     stockItem: {
//         quantity: number;
//         name: string;
//     };

export type InventoryStatus = "out" | "low" | "good"