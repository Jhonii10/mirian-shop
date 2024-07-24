'use client'
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

interface Props {
    totalPages: number;
}

export const Pagination = ({totalPages}:Props) => {
    
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    

    const creatPageUrl = (pageNumber:number | string)=>{
        const params =new URLSearchParams(searchParams)

        if (pageNumber === '...') {
            return `${pathname}?${params.toString()}`;
        }

        if(Number(pageNumber) <= 0){
            return `${pathname}`
        }

        if(+pageNumber > totalPages){
            return `${pathname}?${params.toString()}`;
        }

        params.set('page',pageNumber.toString());
        return `${pathname}?${params.toString()}`;

    }

    const generatePagination = (currentPage: number, totalPages: number) => {
        
        if (totalPages <= 6 ) {
          return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
      
        if (currentPage <= 3) {
          return [1, 2, 3, '...', totalPages - 1, totalPages];
        }
      
        if (currentPage >= totalPages - 2) {
          return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
        }
      
        return [
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        ];
      };

   const allPages = generatePagination(currentPage, totalPages);
       
  return (
    <div className="flex justify-center my-6">
    <nav aria-label="Page navigation">
    <ul className="inline-flex space-x-2">
        <li>
        <Link 
            href={creatPageUrl(currentPage - 1)} 
            className={"flex items-center justify-center w-[2rem] h-[2rem] sm:w-10 sm:h-10 text-blue-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-blue-100 "}
            >
            {<IoChevronBackOutline className="w-4 h-4 fill-current" />}
        </Link>
        </li>

        {
            allPages.map((page, index)=>(
                <li key={page}>
                <Link
                    href={creatPageUrl(page)}
                    className={ clsx(" flex items-center justify-center w-[2rem] h-[2rem] sm:w-10 sm:h-10  text-blue-600 transition-colors duration-150 rounded-full focus:shadow-outline hover:bg-blue-500 hover:text-white",{
                        'bg-blue-500 text-white font-semibold': currentPage === page
                    })}
                    
                    >
                    {page}
                </Link>
                </li>
            ))
        }
        
        <li>
        <Link href={creatPageUrl(currentPage + 1)} className="flex items-center justify-center w-[2rem] h-[2rem] sm:w-10 sm:h-10 text-blue-600 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-blue-100">
        {<IoChevronForwardOutline className="w-4 h-4 fill-current" />}
        </Link>
        </li>
    </ul>
    </nav>
    </div>
  )
}
