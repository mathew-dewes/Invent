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
  vendor: {
    name: string;
  },
  purchases?: {
    status: PurchaseStatus
  }[]
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
  PONumber: number
}

export type CostCentre = {
  name: string;
  id: string;
  code: string;
  createdAt: Date;
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
  costCentre: {
    name: string
  },
  note?: string | null
}

export type SingleRequest = {
    id: string;
    createdAt: Date;
    quantity: number;
    requestNumber: number;
    customer: string;
    status: RequestStatus;
    note: string | null;
    stockItem: {
        id: string;
        name: string;
        quantity: number;
    };
    costCentre: {
        id: string;
        createdAt: Date;
        name: string;
        userId: string;
        code: string;
    };


}


export type Purchase = {
 totalCost: string | undefined;
    id?: string | undefined;
    createdAt?: Date | undefined;
    purchaseNumber?: number | undefined;
    status?: PurchaseStatus | undefined;
    notes?: string | null | undefined;
    quantity?: number | undefined;
    stockItem?: {
        id: string;
        quantity: number;
        name: string;
    } | undefined;
    
}

export type Finance = {
  totalCost: string;
  id: string;
  createdAt: Date;
  sourceType: FinanceType;
  stockId?: string;
  vendorId?: string | null;
  userId?: string;
  plantNumber?: string | null;
  stockName: string;
  vendorName: string | null;
  quantity: number;
  unitCost?: string;
  month?: number;
  year?: number;
  costCentre: {
    name: string
  } | null

}

export type InventoryStatus = "out" | "low" | "good";

export type TimeFrame = "day" | "week" | "month" | "year";


export type StockOverviewType = "Out of stock" | "Below reorder point" | "Critical items"