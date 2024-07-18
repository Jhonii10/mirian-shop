import { Size } from '@/interfaces'
import clsx from 'clsx';
import React from 'react'

interface Props {
    selectedSize: Size;
    availableSizes:Size[];
}

export const SizeSelector = ({availableSizes = ['S','M'], selectedSize}:Props) => {

  return (
    <div className='my-5'>
        <h3 className='font-bold mb-2'>Tallas disponibles</h3>

        <div className='flex '>
            {
                availableSizes.map((size, index) => (
                    <button 
                        key={index}
                        className={
                            clsx('mx-2 hover:underline text-lg',{
                                'underline font-bold': selectedSize === size
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
