'use client';

import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'

export const PlaceOrders = () => {

    const router = useRouter();

    const [loaded, setLoaded] = useState(false);
    const [isPlaceOrder, setInPlaceOrder] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {subtotal, total, tax , itemsInCart} = useCartStore(state => state.getSummaryInformation());
    const addressUser = useAddressStore(state => state.address);
    const cart = useCartStore(state => state.cart);
    const clearCart = useCartStore(state => state.clearCart)

    

    const {firtsName,lastName,address, country, city ,phone , postalCode} = addressUser;

    useEffect(() => {
        setLoaded(true)
    }, []);


    if (!loaded) {
        return <p>Cargando...</p>
    }

    const onPlaceOrder = async()=>{
        setInPlaceOrder(true)

        const productToOrder = cart.map((product)=>({
            productId : product.id,
            quantity : product.quantity,
            size: product.size
        }))

        const resp  = await placeOrder(productToOrder , addressUser)
        if (!resp.ok) {
            setInPlaceOrder(false);
            setErrorMessage(resp.message);
            return;
        }else{
          
          

          setTimeout(() => {
            clearCart()
          },1000);

          router.replace(`/orders/${resp.order?.id}`);
        }
        
        
    }

  return (
    <div>
    <div className="bg-white rounded-lg shadow-xl p-7">

        <h2 className="text-xl mb-2">Direccion de entrega</h2>
         <div>
          <p className='capitalize'>{firtsName} {lastName}</p>
          <p>{address}</p>
          <p>{postalCode}</p>
          <p>{country} {city}</p>
          <p>{phone}</p> 
         </div> 

        <div className="w-full h-px rounded bg-gray-300 my-5"/>

      <h2 className="text-xl mb-2 font-semibold">Resumen del pedido</h2>
      <div className="grid grid-cols-2">
        <span className="font-medium">No Productos</span>
        <span className="text-right">{itemsInCart} articulos</span>

        <span className="font-medium">Subtotal</span>
        <span className="text-right">{currencyFormat(subtotal)}</span>

        <span className="font-medium">impuesto 19%</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="font-bold my-2">Total</span>
        <span className="text-right font-bold my-2"  >{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        
        <p className="mb-5">
          <span className="text-xs">
            Al realizar el pedido, aceptas nuestros {' '}
            <a className="underline" href="#">terminos y condiciones</a>{' '}
            junto con nuestra{' '}
            <a className="underline" href="#">politica de privacidad</a>
          </span>
        </p>
    
        <span className='text-red-600 text-sm font-semibold'>{errorMessage}</span>

        <button
          className={ clsx( {
            "btn-primary flex justify-center mt-2 w-full" : !isPlaceOrder,
            "btn-disabled flex justify-center mt-2 w-full": isPlaceOrder
          })}
          onClick={onPlaceOrder}
          disabled={isPlaceOrder}
          >
           Realizar pedido
        </button>
      </div>

    </div>
    </div>
  )
}
