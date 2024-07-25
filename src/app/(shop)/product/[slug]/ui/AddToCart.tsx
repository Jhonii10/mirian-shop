'use client'

import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'
import React, { useState } from 'react'

export const AddToCart = ({product}:{product:Product}) => {

    

    const [size, setSize] = useState<Size|undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addToCart = ()=>{

        if (!size) {
            setPosted(true)
            return
        };

        console.log({size, quantity, product})
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
