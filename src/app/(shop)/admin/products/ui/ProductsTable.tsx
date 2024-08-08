'use client';

import { changeUserRole } from '@/actions';
import { ProductImage } from '@/components';
import { Product, User } from '@/interfaces'
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface Props {
    products: Product[]
}


export const ProductsTable = ({products}:Props) => {
  return (
    <>
    <div className='flex justify-end mb-4'>
        <Link
            href="/admin/products/new"
            className='btn-primary '
        >
            Nuevo producto
        </Link>
    </div>
    <div className="mb-10 overflow-x-auto rounded-lg border border-gray-200">
        
        <table className="min-w-full ">
          <thead className="bg-gray-200 border-b ">
            <tr>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">        
                Precio
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Genero
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Inventario
              </th>
              <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products?.map((product , index)=>(
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={product.id+'-'+index}>

                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                <Link href={`/admin/products/${product.slug}`}>
                  <ProductImage 
                    src={product.images[0]}
                    alt={product.title}
                    width={80}
                    height={80}
                    className='object-cover rounded'
                  />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  <Link href={`/admin/products/${product.slug}`}>
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-semibold px-6 ">
                  {currencyFormat( product.price)}
                </td>
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(',')}
                </td>
  
              </tr>
              ))
            }


          </tbody>
        </table>
      </div>
      </>
  )
}
