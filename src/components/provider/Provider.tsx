'use client';


import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import React from 'react'

interface Props {
    children: React.ReactNode,
    session?: Session | null;
}

export const Provider = ({children , session }:Props) => {

    
  return (
    <SessionProvider session={session} >
        {children}
    </SessionProvider>
  )
}
