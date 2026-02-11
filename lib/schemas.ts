import z from 'zod'

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(30)
});

export const signUpSchema = z.object({
    name: z.string().min(3).max(30),
    email: z.email(),
    password: z.string().min(8).max(30)
});

export const stockSchema = z.object({
    name: z.string().min(1, "Name is required").min(3, "Stock item name must be 3 more than characters").max(15, "Stock name must be 15 or less characters"),
    quantity: z.string().min(1, "Quantity is required")
        .refine((val) => {
            const num = Number(val); return !isNaN(num) && num > 0;
        }, {
            message: "Quantity must be greater than 0",
        }),

    partNumber: z.string().min(1, "Part or SKU number is required").min(3, "Part number or SKU number must be 3 or more characters").max(10, "Part number, or SKU must be 10 or less characters" ),
    location: z.string().min(1, "Bin location is required").min(3, "Bin location must be 3 or more characters"),
    vendorId: z.string('Please select a vendor'),
    brand: z.string().min(1, "Brand or model is required").min(3, "Brand or model name must be 3 more than characters").max(10, "Brand name must be 10 or less characters" ),
    unitCost: z.string().min(1, "Unit cost is required")
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num) && num > 0;
        }, {
            message: "Unit cost must be greater than 0",
        }),

    reorderPoint: z.string().min(1, "Reorder point is required")
        .refine((val) => {
            const num = Number(val);
            return !isNaN(num) && num > 2;
        }, {
            message: "Reorder point must be greater than 2",
        }),
});

export const stockUpdateQuantitySchema = z.object({
       quantity: z.string().min(1, "Quantity is required")
        .refine((val) => {
            const num = Number(val); return !isNaN(num) && num > 0;
        }, {
            message: "Quantity must be greater than 0",
        }),
})


export const vendorSchema = z.object({
    name: z.string().min(1, 'Vendor name is required'),
    address: z.string().optional(),
    phone: z.string().max(15, "Please enter a valid phone number").optional(),
    email: z.string().min(1, 'Email address is required'),
    contactName: z.string().min(1, 'Contact name is required'),
    PONumber: z.string().length(6, "PO number must be 6 characters")
        .refine((val) => {
            const num = Number(val); return !isNaN(num) && num > 0;
        }, {
            message: "Quantity must be greater than 0",
        }),
});


export const costCentreSchema = z.object({
    name: z.string().min(1, 'Cost centre name is required').max(15, 'Cost centre name must be 15 characters or less'),
    code: z.string().length(5, 'Cost center code must be 5 characters long')
})

export const requestSchema = z.object({
    customer: z.string().min(1, "Customer name is required").max(20, "Customer name must be 20 characters or less"),
    stockItem: z.string().min(1, "Stock item is required"),
    quantity: z.string().min(1, "Quantity is required")
        .refine((val) => {
            const num = Number(val); return !isNaN(num) && num > 0;
        }, {
            message: "Quantity must be greater than 0",
        }),
    costCentreId: z.string().min(1, "Cost centre is required"),
    notes: z.string().max(200, "Note must be 200 characters or less").optional(),
  stockId: z.string('Please select a vendor'),

});


export const purchaseSchema = z.object({
   item: z.string(),
    quantity: z.string().min(1, "Quantity is required")
        .refine((val) => {
            const num = Number(val); return !isNaN(num) && num > 0;
        }, {
            message: "Quantity must be greater than 0",
        }),
    notes: z.string().optional(),

    
});

export const budgetSchema = z.object({
    budget: z.string().min(1, 'Budget amount is required')
})



