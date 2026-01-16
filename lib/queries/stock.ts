"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getStock(){
const userId = await getUserId();
const stock = await prisma.stock.findMany({
    where: {
        userId
    },
    select:{
        id: true,
        quantity: true,
        name:true,
        location: true,
        reorderPoint: true,
        maxStock: true,
        vendor:{
            select:{
                name: true
            }
        },
        unitCost: true,
        brand: true
    },

    orderBy: {
        createdAt: "desc"
    }

});


return stock;


};

export async function getStockNames(){
const userId = await getUserId();
const stock = await prisma.stock.findMany({
    where: {
        userId
    },
    select:{
        id: true,
        name:true,
  
    },

    orderBy: {
        createdAt: "desc"
    }

});


return stock;
}


export async function checkInventory(id: string){
      return await prisma.stock.count({
        where:{id}
      })
}