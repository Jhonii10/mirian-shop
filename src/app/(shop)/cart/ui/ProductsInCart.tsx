'use client'

import { CartProduct, Product } from '@/interfaces'
import { useCartStore } from '@/store'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RiDeleteBin6Line } from 'react-icons/ri'
import AddressPage from '../../checkout/address/page';
import { QuantitySelector } from '@/components'
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
                      src={`/products/${product.image}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      title={product.title}
                      className=" mr-2 rounded-md object-cover"
                    />
                    
                    <div className="flex flex-col justify-around gap-2">
                        <Link href={`/product/${product.slug}`}>
                        <p className="text-sm sm:text-md font-semibold">{product.title}</p>
                        </Link>
                        <p className="text-sm sm:text-md font-medium">Talla: {product.size}</p>
                        <p className="font-semibold">$ {product.price}</p>
                         <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 ">
                          <QuantitySelector quantity={product.quantity} setQuantityChange={quantity=>updateProductQuantity(product ,quantity)} inStock={product.stock}/>
                        <button 
                            className="ml-0 sm:ml-2 "
                            onClick={() => removeProductFromCart(product)}
                            >
                          {<RiDeleteBin6Line size={25}  className="ml-0 sm:ml-5 text-zinc-500  hover:text-red-500"/>}
                        </button>

                         </div>
                        
                    </div>
                </div>
              ))
            }
    </>
  )
}
