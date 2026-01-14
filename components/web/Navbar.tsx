"use client"

import Link from "next/link";
import {  Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const { useSession } = authClient;

export function Navbar() {
        const router = useRouter();
            const {data: session, isPending, refetch 
    } = useSession();

    
    return (
        <nav className="w-full py-5 flex items-center justify-between mb-4">
            <div className="flex items-center gap-8">
                <Link href={'/'}>
                    <h1 className="text-3xl font-bold">Invent
           
                    </h1></Link>
                <div className="flex items-center gap-2">
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/stock'}>Stock</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/requests'}>Requests</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/purchases'}>Purchases</Link>
                    <Link className={buttonVariants({ variant: "ghost" })} href={'/vendors'}>Vendors</Link>
       
          

                </div>


            </div>

            <div className="flex items-center gap-2">
                <div className="hidden md:block mr-2">
                    {/* <SearchInput/> */}
                </div>
                {isPending ? null : session ? (
                    <Button onClick={()=> authClient.signOut({
                        fetchOptions:{
                            onSuccess:()=>{
                                toast.success("Logged out successfully!");
                                refetch()
                                router.refresh();  
                                router.push('/');
                            
                            },
                            onError: (error)=>{
                                toast.error(error.error.message)
                            }
                        }
                    })}>Logout</Button>
                ) : <>
                    <Link className={buttonVariants()} href={'/auth/register'}>Sign up</Link>
                    <Link className={buttonVariants({ variant: "outline" })} href={'/auth/login'}>Login</Link>
                    </>}
                    <ThemeToggle />

            </div>

        </nav>
    )
}