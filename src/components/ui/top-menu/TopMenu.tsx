'use client'
import { quicksand } from '@/font'
import { useUiStore } from '@/store'

import Link from 'next/link'
import React from 'react'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

export const TopMenu = () => {

    const openSideMenu = useUiStore((state) => state.openSideMenu)

  return (
    <nav className='flex px-4 py-4 justify-between items-center w-full'>

        {/* logo menu */}
        <div>
            <Link
             href={'/'}
             >
                <div className="relative flex place-items-center   after:absolute after:-z-20 after:h-[120px] after:w-full  after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl  before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#ff0167] after:dark:opacity-40 ">
                <span className={`${quicksand.className} font-bold `}>
                    Mirian | Shop
                </span>
                </div>
            </Link>
        </div>

        {/* center menu */}
        <div className='hidden sm:block'>
            <Link 
                href={'/category/men'} 
                className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-medium'>
                Hombres
            </Link>
            <Link 
                href={'/category/women'} 
                className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-medium'>
                Mujeres
            </Link>
            <Link 
                href={'/category/kids'} 
                className='m-2 p-2 rounded-md transition-all hover:bg-gray-100 font-medium'>
                Niños
            </Link>
        </div>


        {/* search, car, menu */}
        <div className='flex items-center gap-4'>
            <Link href={'/search'} >
                <IoSearchOutline className='w-5 h-5' />
            </Link>
            <Link href={'/cart'} >
                <div className='relative'>
                    <span className='absolute text-xs  rounded-full px-1 font-bold -top-2 -right-2 bg-blue-500 text-white '>
                        3
                    </span>
                    <IoCartOutline className='w-5 h-5'/>
                </div>
            </Link>

            <button 
                className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'
                onClick={openSideMenu}
            >
              Menu  
            </button>
            
        </div>

    </nav>    
)
}
