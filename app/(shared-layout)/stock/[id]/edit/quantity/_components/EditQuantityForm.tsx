"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stockUpdateQuantitySchema } from "@/lib/schemas";
import z from "zod";
import { useTransition } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateSingleStockItemQuantity } from "@/lib/actions/stock";

export default function EditQuantityForm({stockId ,stockName, stockQuantity}:
    {stockId:string ,stockName: string, stockQuantity: number}
) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();


    const form = useForm({
        resolver: zodResolver(stockUpdateQuantitySchema),
        defaultValues: {
            quantity:""


        }
    });

    function onSubmit(values: z.infer<typeof stockUpdateQuantitySchema>) {

        const stockAmount = Number(values.quantity)
        
        
        startTransition(async () => {
            try {
        const res = await updateSingleStockItemQuantity(stockId, stockAmount);
        if (res.success){
            toast.success(res.message);
            router.push('/stock')
        }

      

        
            } catch (error) {
            console.log(error);
            toast.error("There was error. Please advise admin")
            }
       


        })


    }
    return (
        <Card className="w-full max-w-lg mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">{stockName}</CardTitle>
                <CardDescription>Please fill out the required fields to save a stock item to the system.</CardDescription>
                <h1>Quantity: {stockQuantity}</h1>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
            
             

                        <div className="flex gap-10">
                            <Controller name="quantity" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Quantity</FieldLabel>
                                        <Input type="number" aria-invalid={fieldState.invalid} placeholder="Stock quantity" {...field} />
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
                                    <span>updating...</span>
                                </>
                            ) : (<span>Update</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}