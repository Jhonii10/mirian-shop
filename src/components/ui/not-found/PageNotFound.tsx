import { quicksand } from '@/font'
import Image from 'next/image'
import Link from 'next/link'

export const PageNotFound = () => {
  return (
    <div className='flex flex-col md:flex-row h-[90vh] w-full justify-center items-center align-middle'>
        <div className='text-center px-5 mx-5'>
            <h2 className={`${quicksand.className} antialiased text-9xl font-semibold`}>404</h2>
            <p className='font-semibold text-xl'>¡Whoops! Lo sentimos mucho</p>
            <p className='font-light'>
                <span>Puedes regresar </span>
                <Link
                    href='/'
                    className='font-semibold hover:underline transition-all'
                >
                    inicio
                </Link>
            </p>

        </div>

        <div className='px-5 mx-5'>
            <Image
                src='/imgs/starman_750x750.png'
                alt='404'
                className='p-5 sm:p-0'
                width={500}
                height={500}
            />

        </div>

    </div>
    
  )
}
