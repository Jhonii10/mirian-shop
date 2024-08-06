"use server"

import { prisma } from "@/lib/prisma"


export const setTransactionId = async (orderId:string , transaction:string) => {

    try {
       const order =  await prisma.order.update({
            where: {
                id:orderId,
            },
            data:{
                transactionId:transaction
            },


        })

        if (!order) {
            return {
                ok:false,
                message: `No se encontro una orden con el id ${orderId}`,
            }
        }

        return{
            ok:true,
            message: `La orden ${orderId} se actualizo correctamente`
        }

    } catch (error) {
        console.log(error);
        return{
            ok:false,
            message:'no se pudo actualizar el id de la transacion'
        }
    }
    


  
}
