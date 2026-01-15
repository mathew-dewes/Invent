import { RequestStatus } from "@/generated/prisma/enums";

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
name: string
}
quantity: number
status: RequestStatus
plantNumber: string
note?: string | null
}

export type Purchase = {
  id: string
  purchaseDate: string,
  orderNumber: number
  vendor: string
  quantity: number
  stock: string
  notes: string
  backOrderAmount?: number
  status: string
  forfilled: boolean
  reasoning: string
  cost: number
}