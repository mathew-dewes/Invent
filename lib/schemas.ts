import z from 'zod'


export const stockSchema = z.object({
    name: z.string(),
    category: z.string(),
    status:z.string(),
    quantity:z.number(),
    location: z.string(),
    vendor: z.string(),
    brand: z.string(),
    unitCost: z.number(),
    maxStock: z.number(),
    reorderPoint: z.number()
})