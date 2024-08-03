'use client'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const OrderSummary = () => {

    const router = useRouter();


    const [isClient, setIsClient] = useState(false);
    const {subtotal, total, tax , itemsInCart} = useCartStore(state => state.getSummaryInformation())

    useEffect(() => {
        setIsClient(true)
    }, []);

    useEffect(() => {

      if ( itemsInCart === 0 && isClient === true )   {
        router.replace('/empty')
      }
  
  
    },[ itemsInCart, isClient, router])
  
  

    if(!isClient) return <p>Cargando...</p>

    
    
  return (
    <div>
            <div className="bg-white rounded-lg shadow-xl p-7">
              <h2 className="text-xl mb-2 font-semibold">Resumen del pedido</h2>
              <div className="grid grid-cols-2">
                <span className="font-medium">No Productos</span>
                <span className="text-right">{itemsInCart} articulos</span>

                <span className="font-medium">Subtotal</span>
                <span className="text-right">{currencyFormat(subtotal)}</span>

                <span className="font-medium">impuesto 19%</span>
                <span className="text-right">{currencyFormat(tax)}</span>

                <span className="font-bold">Total</span>
                <span className="text-right font-bold"  >{currencyFormat(total)}</span>
              </div>

              <div>
                <Link 
                  href={'/checkout/address'}
                  className="btn-primary flex justify-center mt-2 "
                  >
                  Verificar
                </Link>
              </div>

            </div>
            </div>
  )
}
