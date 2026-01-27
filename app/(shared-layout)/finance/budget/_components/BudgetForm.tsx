"use client";

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const today = new Date();
const currentMonth = today.toLocaleString('default', {month: 'long'});

const budgetSchema = z.object({
    budget: z.string().min(1, 'Budget amount is required')
})


export default function BudgetForm(){

         const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(budgetSchema),
        defaultValues:{
            budget: ""
        }
    });

    function onSubmit(values: z.infer<typeof budgetSchema>){
        startTransition(async()=>{
            console.log(values);
            
        })
    }
    return (
        <FieldSet className="w-full max-w-xs">
            <form onSubmit={form.handleSubmit(onSubmit)}>
  <FieldGroup>
    <Controller name="budget" control={form.control}
    render={({field, fieldState})=>(
 <Field>
          <FieldLabel htmlFor="username">Monthly Budget</FieldLabel>
          <Input id="username" type="number" placeholder="Budget $NZD" aria-invalid={fieldState.invalid} {...field} />
              {fieldState.invalid &&
                                        <FieldError errors={[fieldState.error]} />
                                    }
          <FieldDescription>
            Enter your budget amount for {currentMonth}
          </FieldDescription>
        </Field>
    )}
     
    />
  
        <Field orientation={"responsive"}>
           
            <div className="w-full">
      <Button disabled={isPending} className="cursor-pointer">
         {isPending ? (
                <div>
                    <Loader2/>
                     <span>Updating</span>
                </div>
            ):
            (
                <span>Update</span>
            )}
      </Button>
            </div>
      

        </Field>
       
      </FieldGroup>
            </form>
    
    </FieldSet> 
    )
}

