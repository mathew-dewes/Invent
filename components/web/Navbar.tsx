"use client"

import Link from "next/link";
import {  Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { UserAvatar } from "@/app/(shared-layout)/dashboard/_components/action/UserAvatar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";


const { useSession } = authClient;




const links = [
    {href: '/dashboard', label: "Dashboard"},
    {href: '/stock', label: "Stock"},
    {href: '/requests', label: "Requests"},
    {href: '/purchases', label: "Puchases"},
    {href: '/vendors', label: "Vendors"},
    {href: '/finance', label: "Finance"},
    {href: '/cost-centre', label: "Cost centre"},
]

export function Navbar() {
        const router = useRouter();
            const {data: session, isPending, refetch 
    } = useSession();
         const [openMenu, setOpenMenu] = useState(false)

     const pathname = usePathname();
     const userName = session?.user.name;


     const activeLink = (link: string) =>{
        return pathname.startsWith(link)
     } 

       const closeMenu = () =>{
          setOpenMenu((prev) => !prev)
      }


     const generateStyling = (link: string) =>{
        if (!pathname.startsWith(link)){
            return buttonVariants({ variant: "ghost", size: "sm" })
        } else {
            return buttonVariants({ variant: "default", size: "sm" })
        }
     }
     

    
    return (
        <nav className="w-full py-5 flex items-center justify-between mb-4 relative">
            <div className="flex items-center gap-8">
                <Link className={`${!session ? "pointer-events-none" : ""}`} href={session ? "/dashboard" : "#"}>
                    <h1 className="md:text-3xl text-xl font-bold">Invent
           
                    </h1></Link>
                <div className="lg:flex items-center gap-3 hidden">
                    {session && links.map((link, key)=>{
                        return <Link 
                        key={key} 
                        className={generateStyling(link.href)} 
                        href={link.href}>
                            {link.label}</Link>
                    })}

             
        
                </div>
         
                 


            </div>

             

            <div className="lg:flex items-center md:gap-5 gap-4 hidden">
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
                  <button
                style={{display: session ? "" : "none"}}
                    aria-controls="primary-navigation"
                    aria-expanded="false"
                    onClick={closeMenu}
                    className={`z-9999 md:hidden absolute right-3 
            ${openMenu ? "hidden" : ""}`}><span className="sr-only">Menu</span>
                    <Menu size={35} color="white" /></button>
                <button
                style={{display: session ? "" : "none"}}
                    aria-controls="primary-navigation"
                    aria-expanded="false"
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className={`top-4 z-9999 md:hidden mr-4 fixed right-3 
            ${openMenu ? "" : "hidden"}`}><span className="sr-only">Menu</span>
                    <X size={35} color="black" /></button>

                   <ul style={{display: session ? "" : "none"}} className={`gap-5 flex md:hidden fixed bg-primary text-black inset-0 ml-[50%] flex-col items-center px-15 py-30 transform z-20 transition ease-out duration-500
                ${openMenu ? "translate-x-0" : "translate-x-full"}`}>

                    {links.map((link, key)=>{
                        return <Link key={key} href={link.href}>
                    <Button className={cn(`${activeLink(link.href) ? "bg-green-400" : ""}`)} variant={"secondary"} onClick={closeMenu}>{link.label}</Button>
                    </Link>
                    })}
                   
                   
       
                    <button className="cursor-pointer font-light flex">Logout</button>

                </ul>

        </nav>
    )
}