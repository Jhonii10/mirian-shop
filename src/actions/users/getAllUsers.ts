'use server'

import { auth } from "@/auth.config"
import { prisma } from "@/lib/prisma"

export const getAllUsers = async() => {

    const session = await auth();

    if (!session?.user) {
        return{
            ok:false,
            message:'Inicie session'
        }
    }

  try {
     const users = await prisma.user.findMany({
        orderBy:{
            id: 'asc'
        },
     })

     return{
        ok:true,
        users:users
     }
  } catch (error) {
    console.log(error)
    return{
        ok:false,
        message:'no se pudo obtener los usuarios'
    }
  }
}
