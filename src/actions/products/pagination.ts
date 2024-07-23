'use server';

import { prisma } from "@/lib/prisma";

interface Props {
    page?:number;
    take?:number;
}

export const getPaginateProductsWithImages = async ({page = 1 , take = 12}:Props) => {

    
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    

    try {
        const products = await prisma.product.findMany({
            take,
            skip:(page - 1) * take,
            include:{
                productImage:{
                    take:2,
                    select:{
                        url:true
                    }
                }
            }
        })

        const totalCount = await prisma.product.count();
        const totalPages = Math.ceil(totalCount / take);



       return {
        currentPage: page,
        totalPages: totalPages,
        products: products.map(product =>({
            ...product,
            images:product.productImage.map(image=>image.url)
        }))
       }
        
    } catch (error) {
        throw new Error('Error al obtener los productos')
        
    }
}