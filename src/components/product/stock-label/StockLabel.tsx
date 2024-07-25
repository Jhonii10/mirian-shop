'use client'
import { getStockBySlug } from '@/actions';
import { quicksand } from '@/font'
import React, { useEffect, useState } from 'react'
import { StockSkeleton } from '@/components/ui/skeletons/skeletons';


export const StockLabel = ({ slug }: { slug: string }) => {

    const [stock, setStock] = useState(0);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getStock()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
