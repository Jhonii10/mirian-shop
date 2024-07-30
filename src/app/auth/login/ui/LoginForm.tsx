'use client';

import { authenticate } from '@/actions/auth/actions';
import Link from 'next/link'
import React, { useActionState } from 'react'
import { IoInformationOutline } from 'react-icons/io5';
import AddressPage from '../../../(shop)/checkout/address/page';
import { useFormState, useFormStatus } from 'react-dom';
import clsx from 'clsx';

export const LoginForm = () => {

    const [state, formAction] = useFormState(
        authenticate,
        undefined,
      );
    

  return (
    <form action={formAction} className="flex flex-col">

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
          name='email'
          required
          />


        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="password"
          name='password'
          required
          />
          
          {state === 'CredentialsSignin' && (
            <div className='flex mb-5'>
              <IoInformationOutline className="h-5 w-5 text-red-500 " />
              <p className="text-sm text-red-500">Credenciales invalidas</p>
            </div>
          )}
        

        <LoginButton/>

        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link
          href="/auth/new-account" 
          className="btn-secondary text-center">
          Crear una nueva cuenta
        </Link>

      </form>
  )
}



const LoginButton = ()=>{

    const {pending}= useFormStatus();
    return(
        <button
          type='submit'
          className={clsx({
            "btn-primary":!pending,
            "btn-disabled": pending
          })}
          disabled={pending}
          >
          
          Ingresar
        </button>

    )
}