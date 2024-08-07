'use server';

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrdersByUser = async ()=>{

    const session = await auth();

    if (!session?.user) {
        return {
            ok:false,
            message:'Debe authenticarse'
        }
    }
    
    try {
        
    
    const orders = await prisma.order.findMany({
        where:{
            userId:session.user.id
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