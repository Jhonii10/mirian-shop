'use client'

import { useCartStore } from '@/store'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export const ProductsInCart = () => {

    const productInCart = useCartStore(state => state.cart)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true)
    }, []);

    if (!loaded) {
        return <p>Cargando...</p>
    }

    if (productInCart.length <= 0) {
          redirect('/empty')
    }


  return (
    <>
    {
              productInCart?.map((product) => (
                <div key={`${product.slug} + ${product.size}`} className="flex gap-1 border rounded-lg p-2">
                    
                    <Image
                      src={`/products/${product.image}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      title={product.title}
                      className=" mr-2 rounded-md object-cover"
                    />
                    
                    <div className="flex flex-col justify-around gap-2 ">
                        <p className="text-sm sm:text-md font-semibold">{product.title}</p>
                        <p className="text-sm sm:text-md font-medium">Talla: {product.size}</p>
                        <p className="font-semibold">$ {product.price}</p>
                         
                        
                    </div>
                </div>
              ))
            }
    </>
  )
}
