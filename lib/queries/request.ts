"use server";

import { RequestStatus } from "@/generated/prisma/enums";
import { getUserId } from "../actions/auth";
import prisma from "../prisma";
import { getNZDateKey } from "../helpers";

export async function getRequests(filter?: RequestStatus) {
    const userId = await getUserId();
    const requests = await prisma.request.findMany({
        where: {
            userId,
        },


        orderBy: {
            createdAt: "desc"
        },

        select: {
            id: true,
            requestNumber: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true,
                    reorderPoint: true
                }
            },
            quantity: true,
            status: true,
            plantNumber: true,
            note: true
        }

    });



    const openRequests = requests.filter(
        item => item.status === "OPEN"
    );

    const readyRequests = requests.filter(
        item => item.status === "READY"
    );
    const completeRequests = requests.filter(
        item => item.status === "COMPLETE"
    );

    if (filter === "OPEN") {
        return openRequests;
    } else if (filter === "COMPLETE") {
        return completeRequests;
    } else if (filter === "READY") {
        return readyRequests;
    } else {
        return requests;
    }



}



export async function getRequestChartData() {
    const userId = await getUserId();
    const start = new Date();
    start.setDate(start.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const requests = await prisma.request.findMany({
        where: {
            userId,
            createdAt: {
                gte: start, lte: end
            }
        },
        select: {
            createdAt: true,
            status: true
        }
    });

    const map = new Map<string, { date: string; open: number; ready: number, complete: number }>();

    for (const request of requests) {
        const dateKey = getNZDateKey(request.createdAt);
        const existing = map.get(dateKey) ?? {
            date: dateKey,
            open: 0,
            ready: 0,
            complete: 0
        };

        if (request.status == "COMPLETE") {
            existing.complete += 1;
        } else if (request.status == "OPEN") {
            existing.open += 1;
        }
        existing.ready += 1;

        map.set(dateKey, existing)
    };

    const result: { date: string; open:number; ready: number; complete: number }[] = [];
    const current = new Date(start);

    while (getNZDateKey(current) <= getNZDateKey(end)) {
        const key = getNZDateKey(current);

        result.push(
            map.get(key) ?? {
                date: key,
                open: 0,
                ready: 0,
                complete: 0
            }
        );
        current.setDate(current.getDate() + 1);
    };
    return result

}




export async function getRequestsByStatusCount() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        select: {
            status: true
        },
        where: { userId }
    });


    const queryCounts = {
        OPEN: requests.filter(q => q.status === "OPEN").length,
        READY: requests.filter(q => q.status === "READY").length,
        COMPLETE: requests.filter(q => q.status === "COMPLETE").length
    }

    return queryCounts
}

export async function getRequestById(id: string) {
    const userId = await getUserId();
    const requests = await prisma.request.findUnique({
        where: {
            userId, id
        },

        select: {
            id: true,
            requestNumber: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true
                }
            },
            quantity: true,
            status: true,
            plantNumber: true,
            note: true
        }

    });

    return requests;
}

export async function getCompletedRequests() {
    const userId = await getUserId();
    const stock = await prisma.request.findMany({
        where: {
            userId,
            status: "COMPLETE"
        },


        orderBy: {
            createdAt: "desc"
        },

        select: {
            id: true,
            requestNumber: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    id: true,
                    name: true,
                    quantity: true
                }
            },
            quantity: true,
            status: true,
            plantNumber: true,
            note: true
        }

    });


    return stock;
}


export async function getOpenRequests() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        where: { userId, status: "OPEN" },
        select: {
            quantity: true,
            customer: true,
            id: true,
            createdAt: true,
            stockItem: {
                select: {
                    name: true,


                }
            }
        }
    });

    return requests;
}

export async function getReadyRequests() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        where: { userId, status: "READY" },
        select: {
            id: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    name: true
                }
            },
            quantity: true

        }
    });

    return requests;
};


export default async function getRequestTableData() {
    const userId = await getUserId();

    const data = await prisma.request.findMany({
        where: { userId },
        select: {
            id: true,
            createdAt: true,
            customer: true,
            stockItem: {
                select: {
                    name: true
                }
            },
            quantity: true,
            status: true
        },
        take: 10,
        orderBy: {
            createdAt: "desc"
        }
    });

    return data;
};


export async function getRequestHealthPercentage() {
    const userId = await getUserId();

    const requests = await prisma.request.findMany({
        where: { userId },
        select: {
            status: true,
        },
    });


    if (requests.length === 0) {
        return {
            health: 100,
            breakdown: {
                complete: 0,
                ready: 0,
                open: 0,
            },
        };
    }


    const complete = requests.filter(r => r.status === "COMPLETE").length;
    const ready = requests.filter(r => r.status === "READY").length;
    const open = requests.filter(r => r.status === "OPEN").length;

    const WEIGHTS = {
        COMPLETE: 1,
        READY: 0.75,
        OPEN: 0.4,
    } as const;

    const totalScore = requests.reduce((sum, r) => {
        return sum + WEIGHTS[r.status];
    }, 0);

    const health = Math.round((totalScore / requests.length) * 100);

    return {
        health,
        breakdown: {
            complete,
            ready,
            open,
        },
    };
};


