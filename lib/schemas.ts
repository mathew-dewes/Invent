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
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(30)
});

export const signUpSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(30)
});