import { Product } from '@/interfaces';
import React from 'react'
import { ProductItem } from '../products-item/ProductItem';


interface Props {
    products : Product[];
}

export const ProductsGrid = ({products}:Props) => {

  return (
    <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-6'>
      {
        products.map((product) => (
          <ProductItem key={product.slug} product={product}/>
        ))
      }

    </div>
  )
}
