import z from 'zod'


export const stockSchema = z.object({
    name: z.string().min(1, "Name is required").min(3, "Stock item name must be 3 more than characters"),
    quantity: z.string().min(1, "Quantity is required")
        .refine((val) => {
            const num = Number(val); return !isNaN(num) && num > 0;
        }, {
            message: "Quantity must be greater than 0",
        }),

    partNumber: z.string().min(1, "Part or SKU number is required").min(3, "Part or SKU number must be 3 or more characters"),
    location: z.string().min(1, "Bin location is required").min(3, "Bin location must be 3 or more characters"),
    vendor: z.string().min(1, "Vendor is required"),
    brand: z.string().min(1, "Brand or model is required").min(3, "Brand or model name must be 3 more than characters"),

    unitCost: z.string().min(1, "Unit cost is required")
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num) && num > 0;
        }, {
            message: "Unit cost must be greater than 0",
        }),


    maxStock: z.string().min(1, "Unit cost is required")
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num) && num > 1;
        }, {
            message: "Max holding amount must be greater than 1",
        }),
    reorderPoint: z.string().min(1, "Reorder point is required")
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num) && num > 2;
        }, {
            message: "Reorder point must be greater than 2",
        }),
});

export const vendorSchema = z.object({
    name: z.string().min(1, 'Vendor name is required'),
    address: z.string().optional(),
    phone: z.string().max(15, "Please enter a valid phone number").optional(),
    email: z.string().min(1, 'Email address is required'),
    contactName: z.string().min(1, 'Contact name is required')
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(30)
});

export const signUpSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(30)
});