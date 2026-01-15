"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/comboBox";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RequestStatus } from "@/generated/prisma/enums";
import { createRequest } from "@/lib/actions/request";
import { requestSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";



const requestStatuses = Object.values(RequestStatus)



export default function RequestForm({stock}:
    {stock: {id: string, name: string}[]}
){
        const [isPending, startTransition] = useTransition();
         const router = useRouter()

        
        const form = useForm({
            resolver: zodResolver(requestSchema),
            defaultValues: {
                customer:"",
                stockItem: "",
                quantity: "",
                status: "OPEN",
                plant: "",
                notes: ""
    
    
            }
        });

            function onSubmit(values: z.infer<typeof requestSchema>) {

                
                startTransition(async () => {
            try {
        await createRequest(values);
        toast.success(`Request was placed successfully`);
        router.push('/requests')
        
            } catch (error) {
            console.log(error);
            toast.error("There was error. Please advise admin")
            }
       


        })
        
        
            }
    return (
          <Card className="w-full max-w-xl mx-auto mt-15">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Create Request</CardTitle>
                <CardDescription>Please fill out the required fields to create a new request</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller name="customer" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Customer name</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Customer name" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />

                        <Controller name="stockItem" control={form.control}
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



                        {/* <Field>
                               <FieldLabel>Stock Item</FieldLabel>
                            <div>
    <Combobox values={stock}/>
                            </div>

                        </Field> */}
                            
                            <div className="flex gap-5">
      <Controller name="quantity" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Quantity</FieldLabel>
                                    <Input type="number" aria-invalid={fieldState.invalid} placeholder="Enter email address" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                        <Controller name="plant" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field>
                                    <FieldLabel>Plant Number</FieldLabel>
                                    <Input aria-invalid={fieldState.invalid} placeholder="Enter plant number" {...field} />
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
                                </Field>
                            )}
                        />
                            </div>

                            
                        <Controller name="status" control={form.control}
                            render={({ field, fieldState }) => (
                                <Field >
                                    <FieldLabel>Request status</FieldLabel>
                                    <Select


                                        value={field.value}
                                        onValueChange={(value) => {
                                            field.onChange(value)
                                        }}

                                    >
                                        <SelectTrigger className="w-45">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup >
                                                <SelectLabel>Status (Default open)</SelectLabel>
                                                {requestStatuses?.map((status, key) => {
                                                    return <SelectItem key={key} value={status}>{status}</SelectItem>
                                                })}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )} />

        


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
                            ) : (<span>Create request</span>)}
                        </Button>


                    </FieldGroup>
         
                </form>
            </CardContent>

        </Card>
    )
}