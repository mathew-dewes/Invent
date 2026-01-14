"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { vendorSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function VendorForm(){
        const [isPending, startTransition] = useTransition();

        const form = useForm({
            resolver: zodResolver(vendorSchema),
            defaultValues: {
                name:"",
                address: "",
                email: "",
                phone: "",
                contactName: ""
    
    
            }
        });

            function onSubmit(values: z.infer<typeof vendorSchema>) {
                console.log(values);
                
                startTransition(async () => {
                    console.log(values);
        
        
                })
        
        
            }
    return (
          <Card className="w-full max-w-xl mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Add Vendor</CardTitle>
                <CardDescription>Please fill out the required fields to save a new Vendor to the system.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller name="name" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Vendor name" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="address" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Address</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Enter address - Optional" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="email" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Email</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Enter email address" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="phone" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Phone number</FieldLabel>
                                    <Input type="number" aria-invalid={fieldState.invalid} placeholder="Enter phone number" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="contactName" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Contact Person</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Enter name" {...field} />
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
                            ) : (<span>Create Stock</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}