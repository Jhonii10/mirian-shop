'use client'

import { logOut } from '@/actions'
import { useUiStore } from '@/store'
import clsx from 'clsx'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5'

export const Sidebar =  ({session}:{session:Session | null}) => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen)
  const closeSideMenu = useUiStore((state) => state.closeSideMenu)
  
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin' ? true : false;




  
  return (
    <>
       {
        isSideMenuOpen && 
        <>
       
            <div
                className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30'
                
            />
            <div
                className='fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
                onClick={closeSideMenu}
            />
        </>
        }
            <nav
                className={
                    clsx(
                    "fixed p-5 right-0 top-0  w-full sm:w-[400px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-500",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                    )
                }
            >
                <IoCloseOutline
                    className='absolute right-5 cursor-pointer'
                    size={30}
                    onClick={closeSideMenu}
                />

                {/* search */}
                <div className='relative mt-14'>
                    <IoSearchOutline size={20} className='absolute top-2 left-2'/>
                    <input
                        type="text"
                        placeholder='Buscar...'
                        className='w-full bg-zinc-100 rounded pl-10 py-1 pr-10 border-b-2 text-md border-gray-200 focus:outline-none focus:border-blue-500'
                    /> 
                </div>

                {/* menu */}

                {
                    isAuthenticated && (
                        <>
                            <Link 
                                href={'/profile'}
                                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all'
                                onClick={closeSideMenu}
                            >
                                <IoPersonOutline size={20}/>
                                <span className='ml-3 text-md font-medium'>Perfil</span>
                            </Link>
                            

                            <Link 
                                href={'/orders'}
                                className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all'
                                onClick={closeSideMenu}
                            >
                                <IoTicketOutline size={20}/>
                                <span className='ml-3 text-md font-medium'>Ordenes</span>
                            </Link>
                        </>
                    )
                }

                

                {
                    isAuthenticated
                    && ( <button 
                        className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all w-full'
                        onClick={()=>{
                            logOut();
                            closeSideMenu();
                        }}
                        
                    >
                        <IoLogOutOutline size={20}/>
                        <span className='ml-3 text-md font-medium'>Salir</span>
                    </button>

                    )
                }
                {
                !isAuthenticated &&(
                        <Link 
                        href={'/auth/login'}
                        className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all'
                        onClick={closeSideMenu}
                        >
                        <IoLogInOutline size={20}/>
                        <span className='ml-3 text-md font-medium'>Ingresar</span>
                        
                        </Link>

                    )
                }

                
                {
                    isAuthenticated && isAdmin && 
                
                (
                <>
                <div className='w-full h-px bg-gray-200 my-5'/>

                <Link 
                    href={'/'}
                    className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all'
                    onClick={()=>{logOut;closeSideMenu;}}
                >
                    <IoShirtOutline size={20}/>
                    <span className='ml-3 text-md font-medium'>Productos</span>
                </Link>

                <Link 
                    href={'/admin/orders'}
                    className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all'
                    onClick={closeSideMenu}
                >
                    <IoTicketOutline size={20}/>
                    <span className='ml-3 text-md font-medium'>Ordenes</span>
                </Link>

                <Link 
                    href={'/'}
                    className='flex items-center mt-5 p-2 hover:bg-gray-100 rounded-md transition-all'
                    onClick={closeSideMenu}
                >
                    <IoPeopleOutline size={20}/>
                    <span className='ml-3 text-md font-medium'>Usuarios</span>
                </Link>
                </>
                )
                }
            </nav>
        
    </>
  )
}
