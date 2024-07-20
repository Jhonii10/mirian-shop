import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className='flex flex-col w-full text-md mb-10 gap-2'>
        <div className='flex justify-center'>
        <Link
            href={'/'}
            className='mx-3'
        >
            <span className='antialiased font-bold'>Mirian </span>
            <span>| shop</span>{' '}
            <span>© {new Date().getFullYear()}</span>
            
        </Link>

        <Link
            href={'/'}
            className='mx-3'
        >
            <span >Privacidad & legal </span>
          
        </Link>

        <Link
            href={'/'}
            className='mx-3'
        >
            <span>Ubicaciones</span>

        </Link>
        </div>

        <div className='flex justify-center'>
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
