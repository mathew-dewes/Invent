export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock";

export type RequestStatus = "Open" | "Pending" | "Complete"

export type Stock = {
  id: string
  name: string
  status: StockStatus
  quantity: number
  category: string
  location: string
  vendor: string
  brand: string
  unitCost: number
  maxStock: number
  reorderPoint: number
}


export type Vendor = {
    id: string
    name: string
    address: string
    phoneNumber: string
    email: string
    contactPerson: string
}

export type Request = {
id: string,
requestDate: string,
requestNumber: number,
requestee: string
item: string
quantity: number
status: RequestStatus
group: string
plant: number
notes: string
forfilled: boolean
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