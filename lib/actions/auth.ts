"use server";

import { headers } from "next/headers";
import { auth } from "../auth";


export async function getUserId(){
    
        const session = await auth.api.getSession({
            headers: await headers()
        });
    
    const user = session?.user;

    if (!user) throw new Error('Unauthorized');
    return user.id
};

export async function getUserName(){
       const session = await auth.api.getSession({
            headers: await headers()
        });
    
    const user = session?.user;
    return user?.name;
}