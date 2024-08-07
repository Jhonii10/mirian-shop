'use client'

import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import React, { useState } from 'react'
import { CartProduct } from '../../../../../interfaces/products';
import clsx from 'clsx'

export const AddToCart = ({product}:{product:Product}) => {

    

    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);
    const {addProductToCart ,cart} = useCartStore()

    const addToCart = ()=>{

        if (!size) {
            setPosted(true)
            return
        };

        const { id, slug, title, price,images,inStock} = product;

        const CartProduct:CartProduct = {
            id,
            title,
            slug,
            price,
            image:images[0],
            quantity,
            size,
            stock:inStock,
        };

        addProductToCart(CartProduct);
        setSize(undefined);
        setQuantity(1);
        setPosted(false);

    }
    

  return (
    <>
        <SizeSelector
            selectedSize={size}
            availableSizes={product.sizes}
            setSelectedSize={setSize}
        />

        {
            posted && !size && <div className='my-5'><span className='text-red-600 fade-in '>Selecione una talla</span></div> 
        }

        <QuantitySelector 
            quantity={quantity}
            setQuantityChange = {setQuantity}
            inStock={product.inStock}
            />

        <button 
            className={clsx({
                "btn-primary my-5": product.inStock > 0,
                "btn-disabled my-5": product.inStock === 0
            })}
            onClick={addToCart}
            disabled={product.inStock === 0}
        >
         Agregar al carrito
        </button>
    </>
  )
}
