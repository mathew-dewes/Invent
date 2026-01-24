"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockSchema } from "@/lib/schemas";
import z from "zod";
import { useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Vendor } from "@/lib/types";
import { createStock } from "@/lib/actions/stock";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function StockForm({vendors}:
    {vendors: Vendor[]}
) {


    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(stockSchema),
        defaultValues: {
            name: "",
            brand: "",
            location: "",
            partNumber: "",
            unitCost: "",
            quantity: "",
            reorderPoint: ""

        }
    });


    function onSubmit(values: z.infer<typeof stockSchema>) {
        
        startTransition(async () => {
            try {
        await createStock(values);
        toast.success(`${values.name} was added`);
        router.push('/stock')
        
            } catch (error) {
            console.log(error);
            toast.error("There was error. Please advise admin")
            }
       


        })


    }
    return (
        <Card className="w-full max-w-xl mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Create Stock</CardTitle>
                <CardDescription>Please fill out the required fields to save a stock item to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller name="name" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Stock item name" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="brand" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Brand / Model</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Brand or model name" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="partNumber" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Part number / SKU</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Stock item name" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />

                        <Controller name="vendorId" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel>Vendor</FieldLabel>
                                    <Select


                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                        }}

                                    >
                                        <SelectTrigger className="w-45">
                                            <SelectValue placeholder="Location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup >
                                                <SelectLabel>Location</SelectLabel>
                                                {vendors?.map((vendor, key) => {
                                                    return <SelectItem key={key} value={vendor.id}>{vendor.name}</SelectItem>
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />

                        <div className="flex gap-10">
                            <Controller name="location" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Bin Location</FieldLabel>
                                        <Input aria-invalid={fieldState.invalid} placeholder="Bin location" {...field} />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />
                                        }
                                    </Field>
                                )}
                            />
                            <Controller name="unitCost" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Unit cost</FieldLabel>
                                        <Input  type="number" aria-invalid={fieldState.invalid} placeholder="$ cost per unit" {...field} />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />
                                        }
                                    </Field>
                                )}
                            />
                        </div>

                        <div className="flex gap-10">
                            <Controller name="quantity" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Quantity (Current)</FieldLabel>
                                        <Input type="number" aria-invalid={fieldState.invalid} placeholder="Stock quantity" {...field} />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />
                                        }
                                    </Field>
                                )}
                            />
                                <Controller name="reorderPoint" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Reorder point</FieldLabel>
                                    <Input type="number" aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
             
                        </div>

                    



                        <Button className="mt-3" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (<span>Create Stock</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}