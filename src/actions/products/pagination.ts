'use server';

import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface Props {
    page?:number;
    take?:number;
    gender?:Gender;
}

export const getPaginateProductsWithImages = async ({page = 1 , take = 12 , gender}:Props) => {

    
    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;
    

    try {
        const products = await prisma.product.findMany({
            
            include:{
                productImage:{
                    take:2,
                    select:{
                        url:true
                    }
                }
            },
            
            skip:(page - 1) * take,
            take:take,
            where: {
                gender: gender
            }
        })

        

        const totalCount = await prisma.product.count({ where: {
            gender: gender
        }});
        
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