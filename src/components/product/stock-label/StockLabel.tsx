'use client'
import { getStockBySlug } from '@/actions';
import { quicksand } from '@/font'
import React, { useEffect, useState } from 'react'
import { StockSkeleton } from '@/components/ui/skeletons/skeletons';

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';


export const StockLabel = ({ slug }: { slug: string }) => {

    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getStock()
    }, []);

    const getStock = async ()=>{
       
       const stock = await getStockBySlug(slug)
       setStock(stock)
       setLoading(false)
    }

    
    

  return (
    <>
    {
        !loading 
        ? <h1 className={`${quicksand.className} antialiased font-bold text-xl`}>Stock: {stock}</h1>
        : <StockSkeleton />
    }
    
    </>


  )
}
