'use client'

import { Product } from '@/interfaces'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

interface Props {
    product: Product;
}

export const ProductItem = ({product}:Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    const localSrc = (displayImage)
    ? displayImage.startsWith('http')
        ? displayImage
        : `/products/${displayImage}`
    : '/imgs/placeholder.jpg'
    
    
  return (
    <div className='rounded-md overflow-hidden fade-in '>
        <Link
             href={`/product/${product.slug}`}
        >
        <Image
            src={localSrc}
            alt={product.title}
            width={500}
            height={500}
            className='w-full object-cover rounded'
            onMouseEnter={()=>setDisplayImage(product.images[1])}
            onMouseLeave={()=>setDisplayImage(product.images[0])}
        />
        </Link>
        <div className='flex flex-col p-4'>
            <Link href={`/product/${product.slug}`} className='hover:text-blue-600'>
                {product.title}
            </Link>
            <span className='font-bold'>${product.price}</span>

        </div>
        
    </div>
  )
}
