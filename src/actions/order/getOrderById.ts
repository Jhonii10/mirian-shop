'use server';

import { auth } from "@/auth.config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (id:string)=>{

    const session = await auth();

    if (!session?.user) {
        return {
            ok:false,
            message: "Debe de estar auntenticado",
        }
    }

    try {
        
    const order = await prisma.order.findUnique({
        where:{
            id:id
        },
        include:{
            OrderAddress:true,
            OrderItem:{
                select:{
                    price:true,
                    quantity:true,
                    size:true,
                    product:{
                        select:{
                            title:true,
                            slug:true,
                            productImage:{
                                select:{
                                    url:true
                            },
                            take:1
                        }
                    }
                }
            }
        }
    }})

    if (!order) {
        throw `${id} no existe`
    }

    if (session.user.role === 'user') {
        if (order.userId !== session.user.id) {
        throw `${id} no es de este usuario`
        }
    }

    
    return {
        order:order, 
        ok:true
    }
    } catch (error) {
      console.error(error)
      return {
        ok:false,
        message: "Orden no existe",
      }
    }
    
}