"use server"

import { prisma } from "@/lib/prisma"

export const deleteUserAddress = async (userId : string) => {
    
    
    try {
        const deleted = await prisma.userAddress.delete({
            where: {userId}
        })
        
        return {ok:true}
    } catch (error) {
        console.error(error);
        return {
            ok:false,
            message:'no se puedo eliminar la direccion'
        }
    }
  
}
