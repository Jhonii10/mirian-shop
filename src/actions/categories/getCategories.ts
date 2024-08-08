'use server';

import { prisma } from "@/lib/prisma";

export const getCategories = async() => {
  
    try {
       const catergories = await prisma.category.findMany({
        orderBy:{
            name:'asc'
        }
       })

       return catergories

    } catch (error) {
        console.log(error);
        return [];
    }
}
