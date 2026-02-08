"use client"

import Link from "next/link";
import {  Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "@/app/(shared-layout)/dashboard/_components/action/UserAvatar";


const { useSession } = authClient;




const links = [
    {href: '/dashboard', label: "Dashboard"},
    {href: '/stock', label: "Stock"},
    {href: '/requests', label: "Requests"},
    {href: '/purchases', label: "Puchases"},
    {href: '/vendors', label: "Vendors"},
    {href: '/finance', label: "Finance"},
]

export function Navbar() {
        const router = useRouter();
            const {data: session, isPending, refetch 
    } = useSession();

     const pathname = usePathname();
     const userName = session?.user.name;


     const generateStyling = (link: string) =>{
        if (!pathname.startsWith(link)){
            return buttonVariants({ variant: "ghost", size: "sm" })
        } else {
            return buttonVariants({ variant: "default", size: "sm" })
        }
     }
     

    
    return (
        <nav className="w-full py-5 flex items-center justify-between mb-4">
            <div className="flex items-center gap-8">
                <Link className={`${!session ? "pointer-events-none" : ""}`} href={session ? "/dashboard" : "#"}>
                    <h1 className="text-3xl font-bold">Invent
           
                    </h1></Link>
                <div className="lg:flex items-center gap-4 hidden">
                    {session && links.map((link, key)=>{
                        return <Link 
                        key={key} 
                        className={generateStyling(link.href)} 
                        href={link.href}>
                            {link.label}</Link>
                    })}

             
        
                </div>
                 


            </div>
             

            <div className="flex items-center gap-5">
                {session && userName && <UserAvatar name={userName}/> }
          

                  <div className="flex gap-3 items-center">
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
                    <Link className={buttonVariants()} href={'/auth/register'}>Register</Link>
                    <Link className={buttonVariants({ variant: "outline" })} href={'/auth/login'}>Login</Link>
                    </>}
                    <ThemeToggle />
                  </div>
        
      

            </div>

        </nav>
    )
}