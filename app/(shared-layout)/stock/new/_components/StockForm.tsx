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

export const categories = ['All' ,'Food & Drink', 'Cafes', 'Restaurants', 'Bars & Pubs', 'Attractions', 'Outdoor & Nature', 'Activities & Experiences', 'Shopping & Retail', 'Accommodation', 'Events & Venues'] as const

export default function StockForm(){
const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(stockSchema),
        defaultValues:{
            name:"",
            brand: "",
            location: "",

        }
    });

        function onSubmit(values: z.infer<typeof stockSchema>) {
        startTransition(async () => {
              console.log(values);
              

        })


    }
    return (
       <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
            <CardTitle>Add new stock item</CardTitle>
            <CardDescription>Create an item</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                    <Controller name="name" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Name</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item name" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                    <Controller name="brand" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Brand / Model</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item name" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                    <Controller name="brand" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Part number / SKU</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item name" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
     
                         <Controller name="location" control={form.control}
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
                                                        {categories.map((location, key) => {
                                                            return <SelectItem key={key} value={location}>{location}</SelectItem>
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid &&
                                                <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )} />
                    
                    <div className="flex gap-10">
        <Controller name="category" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Bin Location</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                            <Controller name="category" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Unit cost</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                    </div>

                    <div className="flex gap-10">
        <Controller name="category" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Quantity (Current)</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                            <Controller name="category" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Max holding amount</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                    </div>
                    <div className="flex gap-10">
        <Controller name="category" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Reorder point</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                            <Controller name="category" control={form.control}
                    render={({field, fieldState}) =>(
                        <Field>
                            <FieldLabel>Max holding amount</FieldLabel>
                            <Input aria-invalid={fieldState.invalid} placeholder="Stock item category" {...field}/>
                            {fieldState.invalid && 
                            <FieldError errors={[fieldState.error]}/>
                            }
                        </Field>
                    )}
                    />
                    </div>
                             
            

           
                </FieldGroup>
            </form>
        </CardContent>

       </Card>
    )
}