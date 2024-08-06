'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {CreateOrderData , CreateOrderActions} from '@paypal/paypal-js'
import { setTransactionId } from '@/actions';

interface Props {
    orderId: string,
    amount: number,
}

export const PayPalButton = ({orderId , amount}:Props) => {

  const [{isPending}] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount*100) / 100 );

  if (isPending) {
    return (
    <div className='animate-pulse'>
        <div className='h-11 bg-slate-300 rounded'/>
        <div className='h-11 bg-slate-300 rounded mt-4'/>
    </div>
    );
    
  }

  

  const createOrder = async(data: CreateOrderData, actions: CreateOrderActions):Promise<string> => {

    const transationId = await actions.order.create({
      intent:'CAPTURE',
      purchase_units: [
        {
          amount: {
            value:roundedAmount.toString(),
            currency_code: 'USD',
          } 
        }
      ],
    });

    const {ok,message} = await setTransactionId(orderId , transationId)

    if (!ok) {
      throw new Error('No se pudo actualizar la orden')
    }
  

    return transationId;
  }

  return (
    <PayPalButtons
        createOrder={createOrder}
    />
  )
}
