"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCostCentre } from "@/lib/actions/costCentre";
import { costCentreSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function CostCentreForm(){
        const [isPending, startTransition] = useTransition();
        const router = useRouter()

        const form = useForm({
            resolver: zodResolver(costCentreSchema),
            defaultValues: {
                code: "",
                name: ""
    
    
            }
        });

            function onSubmit(values: z.infer<typeof costCentreSchema>) {

                
                startTransition(async () => {

                    const res = await createCostCentre(values);

                    if (res.success){
                        toast.success(res.message);
                        router.push('/cost-centres')
                    } else {
                        toast.error(res.message)
                    }
              
        
        
                })
        
        
            }
    return (
          <Card className="w-full max-w-xl mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Add Cost Centre</CardTitle>
                <CardDescription>Please fill out the required fields to save a new Vendor to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller name="name" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Cost centre</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Cost centre name" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="code" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Code</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Enter cost centre code - 6 digits" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                

                        <Button className="mt-3" disabled={isPending}>
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    <span>Loading...</span>
                                </>
                            ) : (<span>Add cost centre</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}