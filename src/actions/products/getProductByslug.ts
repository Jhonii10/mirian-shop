'use server';

import { prisma } from "@/lib/prisma";


export const getProductByslug = async (slug: string) => {
  
  try {
    const product = await prisma.product.findFirst({
      include:{
        productImage:{
          select:{
            url:true
          }
        }
      },
      where: {
        slug: slug,
      }
    })

    if (!product) return null;

    return{
      ...product,
      images:product.productImage.map(image=>image.url)
    }

  } catch (error) {
    console.error(error);
  }
}