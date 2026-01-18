"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";

export async function getAllStock(){
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

export async function getStockById(id: string){
    const userId = await getUserId();
const stock = await prisma.stock.findUnique({
    where: {
        userId, id
    },
    select:{
        id: true,
        quantity: true,
        name:true,
        location: true,
        reorderPoint: true,
        maxStock: true,
        partNumber:true,
        vendor:{
            select:{
                name: true,
                id: true
            }
        },
        unitCost: true,
        brand: true
    },



});


return stock;

}

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