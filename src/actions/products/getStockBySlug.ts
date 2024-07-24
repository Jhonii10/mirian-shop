'use server'
import { prisma } from "@/lib/prisma"

export const getStockBySlug = async (slug:string) => {
   
    
    try {
        const stock: any = await prisma.product.findFirst({
            where: {slug:slug},
            select:{
                inStock:true
            }
        })
        
        return stock.inStock ?? 0;
    } catch (error) {
        console.error(error)
    }
}
