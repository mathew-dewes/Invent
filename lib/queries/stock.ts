"use server";

import { getUserId } from "../actions/auth";
import prisma from "../prisma";


export async function getAllStock(userId: string ,level?: string) {
  

    const stock = await prisma.stock.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            quantity: true,
            name: true,
            location: true,
            reorderPoint: true,
            vendor: {
                select: {
                    name: true
                }
            },
            unitCost: true,
            brand: true,
            purchases:{
                select:{
                    status:true
                }
            }
        },

        orderBy: {
            createdAt: "desc",
        
        }

    });

      const serialisedStock = stock.map(item => ({
    ...item,
    unitCost: item.unitCost.toString(),
  }));

    const inStock = serialisedStock.filter(
        item => item.quantity > item.reorderPoint
    );
    const lowStock = serialisedStock.filter(
       item => item.quantity !== 0 && item.quantity < item.reorderPoint
    )

      const outOfStock = serialisedStock.filter(
        item => item.quantity == 0
    );


      if (level === "out") {
        return outOfStock
    } else if (level === "low") {
        return lowStock
    } else if (level === "good") {
        return inStock
    } else {
        return serialisedStock
    }






};

export async function getTotalStockCount(){
      const userId = await getUserId();
      const stockCount = await prisma.stock.count(
        {where: {userId}}
      );
      return stockCount;
}

export async function getStockById(id: string) {
    const userId = await getUserId();
    const stock = await prisma.stock.findUnique({
        where: {
            userId, id
        },
        select: {
            id: true,
            quantity: true,
            name: true,
            location: true,
            reorderPoint: true,
            partNumber: true,
            vendor: {
                select: {
                    name: true,
                    id: true
                }
            },
            unitCost: true,
            brand: true
        },



    });

  

  if (!stock) return null;

  const serialisedStock = {
    ...stock,
    unitCost: stock.unitCost.toString(),
  };

  return serialisedStock;

};


export async function getStockByStatusCount(){
       const userId = await getUserId();


const stock = await prisma.stock.findMany({
              select: {
      quantity: true,
      reorderPoint: true,
    },
    where:{userId}
      },
    );

  const queryCounts = {
    out: stock.filter(s => s.quantity === 0).length,
    low: stock.filter(s => s.quantity > 0 && s.quantity < s.reorderPoint).length,
    good: stock.filter(s => s.quantity > s.reorderPoint).length,
  };

  return queryCounts
   

};


export async function getStockNamesAndQuantity() {
    const userId = await getUserId();
    const stock = await prisma.stock.findMany({
        where: {
            userId
        },
        select: {
            id: true,
            name: true,
            quantity:true

        },

        orderBy: {
            createdAt: "desc"
        }

    });

return stock
}


export async function increaseStockQuantity(stockId: string, inceaseAmount: number){
     const userId = await getUserId();
     
    try {
        await prisma.stock.update({
            where:{userId, id: stockId},
            data:{
                quantity:{
                    increment: inceaseAmount
                }
            }
        })
    } catch (error) {
        console.log(error);
        
    }

}

export async function checkInventory(id: string) {
    return await prisma.stock.count({
        where: { id }
    })
};


export async function returnStock(stockIdsAndQuantity: 
    {id: string | undefined, quantity: number | undefined}[]){
console.log(stockIdsAndQuantity);
        const userId = await getUserId();

try {
    
    await Promise.all(
        stockIdsAndQuantity.map(async(item)=>{
            await prisma.stock.updateMany({
                where:{userId, id: item.id},
                data:{
                    quantity:{
                        increment: item.quantity
                    }
                }
            })
        })
    )


} catch (error) {
       console.error('Stock return error:', error);
        throw error;
}


}


export async function getStockNameAndQuantityById(stockId: string){
    const userId = await getUserId();
    const stockItem = await prisma.stock.findUnique({
        where:{userId, id: stockId},
        select:{
            name: true,
            quantity:true
        }
    });

    return stockItem
};


export async function getLowStock(){
    const userId = await getUserId();

    const stock = await prisma.stock.findMany({
        where:{userId},
        select:{
            id:true,
            name:true,
            quantity:true,
            purchases:{
                select:{
                    id:true
                    
                },
                where:{
                    status:"PLACED"
                }
            },
            vendor:{
                select:{
                    name:true
                }
            },
            reorderPoint: true,
        
        },
        orderBy:{
            quantity: 'asc'
        },
        take: 5
    });

    const lowStock = stock.filter(item => item.quantity <= item.reorderPoint)

    return lowStock;

 
}


export async function getInventoryChartData(){

    const userId = await getUserId();

  const stockItems = await prisma.stock.findMany({
    where: { userId },
    select: {
      name: true,
      quantity: true,
      reorderPoint: true,
    },
    orderBy: {
      quantity: "asc",
    },
    take: 5,
  });

  const data = stockItems.map((stock) => ({
    name: stock.name,
    count: stock.quantity,
    reorderPoint: stock.reorderPoint,
  }));

  return data;

}


export async function getStockCount(){
    const userId = await getUserId();
    const stockCount = await prisma.stock.count({
        where:{userId}
    });

    return stockCount;
}

export async function getStockValue(){
    const userId = await getUserId();

    const stock = await prisma.stock.findMany(
        {where:{userId},
    select:{
        unitCost:true,
        quantity:true
    }},
    );

    let stockValue = 0;

    stock.forEach(item => {
        stockValue += item.quantity * Number(item.unitCost)
    });

    return stockValue 
}


export async function getStockLevels(){
    const userId = await getUserId();

    const stock = await prisma.stock.findMany({
        where:{userId},
    select: {
      id: true,
      name: true,
      quantity: true,
      reorderPoint: true,
    },
    });

    return stock;
}


export async function getStockNames(){
    const userId = await getUserId();

    const stockNames = await prisma.stock.findMany({
        where:{userId},
        select:{
            name: true,
            id: true
        }
    });

    return stockNames
};


export async function getLowestStockedItems(){
    const userId = await getUserId();

    const items = await prisma.stock.findMany({
        where:{userId},
        select:{
            id:true,
            name:true, 
            quantity: true, 
            reorderPoint: true, 
            vendor:{
                select:{
                    name:true
                }
            }
        },
        orderBy:{
            quantity:"asc"
        },
        take: 10
    });

    return items;
}
   