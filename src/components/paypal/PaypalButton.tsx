'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import React from 'react'

export const PayPalButton = () => {

  const [{isPending}] = usePayPalScriptReducer();

  if (isPending) {
    return (
    <div className='animate-pulse'>
        <div className='h-11 bg-slate-300 rounded'/>
        <div className='h-11 bg-slate-300 rounded mt-4'/>
    </div>
    );
    
  }

  return (
    <PayPalButtons/>
  )
}
