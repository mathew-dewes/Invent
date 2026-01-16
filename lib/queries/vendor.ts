"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getVendors(){
const userId = await getUserId();
const vendors = await prisma.vendor.findMany({
    where: {
        userId
    },
    select:{
        id: true,
        name: true,
        address: true,
        phone: true,
        email: true,
        contactName: true
    },
    orderBy:{
        createdAt: "desc"
    }
});

return vendors;


}

export async function getVendorNames(){
    const userId = await getUserId();
const vendors = await prisma.vendor.findMany({
    where: {
        userId
    },
    select:{
        id: true,
        name: true,
    
    },
    orderBy:{
        createdAt: "desc"
    }
});

return vendors;
}