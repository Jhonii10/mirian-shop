import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex flex-col w-full  mb-10 gap-2'>
        <div className='flex justify-center px-2'>
        <Link
            href={'/'}
            className='mx-3 text-xs sm:text-sm'
        >
            <span className='antialiased font-bold '>Mirian </span>
            <span>| shop</span>{' '}
            <span>© {new Date().getFullYear()}</span>
            
        </Link>

        <Link
            href={'/'}
            className='mx-3 text-xs sm:text-sm'
        >
            <span >Privacidad & legal </span>
          
        </Link>

        <Link
            href={'/'}
            className='text-xs sm:text-sm'
        >
            <span >Ubicaciones</span>

        </Link>
        </div>

        <div className='flex justify-center text-xs sm:text-sm'>
            Contruido con ❤️ por {' '}
            <Link 
                href={'https://www.jhoniipia.com'}
                className='hover:font-bold mx-1'
            >
                Jhoni ipia
            </Link>
        </div>
        
        
    </div>
  )
}
