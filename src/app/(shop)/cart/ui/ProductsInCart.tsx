'use client'

import { useCartStore } from '@/store'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ProductImage as Image, QuantitySelector } from '@/components'
import Link from 'next/link'

export const ProductsInCart = () => {

    const productInCart = useCartStore(state => state.cart)
    const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
    const removeProductFromCart = useCartStore(state => state.removeProductFromCart)
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
                      src={product.image}
                      alt={product.title}
                      width={80}
                      height={80}
                      className=" mr-2 rounded-md object-cover"
                    />
                    
                    <div className="flex flex-col justify-around gap-2 ">
                        <Link href={`/product/${product.slug}`}>
                        <p className="text-sm sm:text-md font-semibold">{product.title}</p>
                        </Link>
                        <p className="text-sm sm:text-md font-medium">Talla: {product.size}</p>
                        <p className="font-semibold">$ {product.price}</p>
                         <div className="flex flex-wrap items-start sm:flex-row sm:items-center gap-2  ">
                          <QuantitySelector quantity={product.quantity} setQuantityChange={quantity=>updateProductQuantity(product ,quantity)} inStock={product.stock}/>
                        <button 
                            className="ml-0 sm:ml-2 "
                            onClick={() => removeProductFromCart(product)}
                            >
                          <p className='underline font-medium  hover:text-red-500 hover:font-bold'>Eliminar</p>
                        </button>

                         </div>
                        
                    </div>
                </div>
              ))
            }
    </>
  )
}
