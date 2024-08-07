'use server';

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrdersByAdmin = async ()=>{

    const session = await auth();

    if (!session?.user && session?.user.role !== 'admin') {
        return {
            ok:false,
            message:'Debe authenticarse'
        }
    }
    
    try {
        
    
    const orders = await prisma.order.findMany({
        orderBy:{
            createdAt:'desc'
        },
        include:{
            OrderAddress:{
                select:{
                    firtsName: true,
                    lastName: true,
                }
            },
        }
    })

    return {
        ok:true,
        orders:orders
    }

    } catch (error) {
        console.error(error) 
        return {
            ok:false,
            message:'algo salio mal'
        }  
    }

}