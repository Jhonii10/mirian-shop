'use client';


import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import React from 'react'

interface Props {
    children: React.ReactNode,
    session?: Session | null;
}

export const Providers = ({children , session }:Props) => {

    
  return (
    <PayPalScriptProvider options={{
       clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? 'test',
       intent:'capture',
       currency: 'USD',
       
       }}>
    <SessionProvider session={session} >
        {children}
    </SessionProvider>
    </PayPalScriptProvider>
  )
}
