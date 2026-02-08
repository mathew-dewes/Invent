"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/comboBox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updatePurchase } from "@/lib/actions/purchase";
import { purchaseSchema } from "@/lib/schemas";
import { Purchase } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import z from "zod";







export default function EditPurchaseForm({stock, values, purchaseId}:
    {stock: {id: string, name: string}[], values: Purchase, purchaseId: string}
){
        const [isPending, startTransition] = useTransition();
         const router = useRouter()

        
        const form = useForm({
            resolver: zodResolver(purchaseSchema),
            defaultValues: {
                item: values.stockItem.id,
                quantity: String(values.quantity),
                notes: values.notes ?? ""
    
    
            }
        });

            function onSubmit(values: z.infer<typeof purchaseSchema>) {

                
                startTransition(async () => {
console.log(values);

      
                    
            try {
               await updatePurchase(values, purchaseId);
        toast.success(`Purchase has been updated`);
        router.push('/purchases')
        
            } catch (error) {
            console.log(error);
            toast.error("There was error. Please advise admin")
            }
       


        })
        
        
            }
    return (
          <Card className="w-full max-w-xl mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Edit Purchase</CardTitle>
                <CardDescription>Please fill out the required fields to place an order with a vendor</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>

                              <Controller name="item" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Stock Item</FieldLabel>
                                    <div>
      <Combobox aria-invalid={fieldState.invalid} values={stock} value={field.value} onChange={field.onChange}/>
                                    </div>
                                  
                
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />

                                              <div className="flex gap-5">
      <Controller name="quantity" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Quantity</FieldLabel>
                                    <Input type="number" aria-invalid={fieldState.invalid} placeholder="Order quantity" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
        
                            </div>


                        <Controller name="notes" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel>Notes:</FieldLabel>
                          <Textarea aria-invalid={fieldState.invalid} placeholder="Write a note - Optional" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />


            
                  

                        <Button className="mt-3" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (<span>Update purchase</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}