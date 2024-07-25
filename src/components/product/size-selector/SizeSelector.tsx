'use client'
import { Size } from '@/interfaces'
import clsx from 'clsx';
import React from 'react'

interface Props {
    selectedSize: Size;
    availableSizes:Size[];
    setSelectedSize: (size: Size) => void;
}

export const SizeSelector = ({availableSizes, selectedSize , setSelectedSize}:Props) => {

  return (
    <div className='my-5'>
        <h3 className='font-bold mb-2'>Tallas disponibles</h3>

        <div className='flex '>
            {
                availableSizes.map((size, index) => (
                    <button 
                        key={index}
                        onClick={()=>setSelectedSize(size)}
                        className={
                            clsx('mx-2 hover:underline text-lg',{
                                'underline font-bold':  size === selectedSize 
                            })
                        }
                    >
                        {size}
                    </button>
                ))
            }

        </div>

    </div>
  )
}
