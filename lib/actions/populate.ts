"use server";

import { getUserId } from "./auth";


export async function LoadDemoData(){
    const userId = await getUserId()
}