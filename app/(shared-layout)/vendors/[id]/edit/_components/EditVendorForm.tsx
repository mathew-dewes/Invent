"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { updateVendor } from "@/lib/actions/vendor";
import { vendorSchema } from "@/lib/schemas";
import { Vendor } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export default function EditVendorForm({values, vendorId}:
    {values: Vendor, vendorId: string}
){
        const [isPending, startTransition] = useTransition();
            const router = useRouter();

        const form = useForm({
            resolver: zodResolver(vendorSchema),
            defaultValues: {
                name:values.name,
                address: values.address ?? "",
                email: values.email,
                phone: values.phone ?? "",
                contactName: values.contactName,
                PONumber: String(values.PONumber)
    
    
            }
        });

            function onSubmit(values: z.infer<typeof vendorSchema>) {

                
                startTransition(async () => {
                    try {
                    await updateVendor(values, vendorId);
                    toast.success(`Vendor details updated`);
                    router.push('/vendors')
                    } catch (error) {

            console.log(error);
            toast.error("There was error updating reccord")
                    }
                 
        
        
                })
        
        
            }
    return (
          <Card className="w-full max-w-xl mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Edit Vendor</CardTitle>
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
                                   <Controller name="PONumber" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>PO number</FieldLabel>
                                    <Input type="number" aria-invalid={fieldState.invalid} placeholder="Enter PO number" {...field} />
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
                            ) : (<span>Update details</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}