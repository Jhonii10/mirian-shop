'use client'

import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'
import React, { useState } from 'react'
import { CartProduct } from '../../../../../interfaces/products';

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

        const { id, slug, title, price,images } = product;

        const CartProduct:CartProduct = {
            id,
            title,
            slug,
            price,
            image:images[0],
            quantity,
            size
        };

        addProductToCart(CartProduct);

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
            className="btn-primary my-5"
            onClick={addToCart}
        >
         Agregar al carrito
        </button>
    </>
  )
}
