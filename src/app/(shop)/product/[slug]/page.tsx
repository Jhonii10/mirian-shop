import { ProductSlideshow, QuantitySelector, SizeSelector } from "@/components";
import { quicksand } from "@/font";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { notFound } from "next/navigation";


interface Props {
    params:{
        slug:string;
    }
}


export default function ProductSlugPage({params}:Props) {

    const {slug} = params;
    const product = initialData.products.find(product => product.slug === slug);

    if(!product){notFound()}
    
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-2 gap-3">
       
       <div className="col-span-1 md:col-span-1 rounded">
         <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
         />
       </div>

       <div className="col-span-1 px-5 p-4 *:rounded">
            <h1 className={`${quicksand.className} antialiased font-bold text-xl`}>{product.title}</h1>
            <p className="text-lg font-semibold">${product.price}</p>
            <SizeSelector
                selectedSize={product.sizes[0]}
                availableSizes={product.sizes}
            />

            {/* todo: selector de cantidad */}
            <QuantitySelector quantity={0}/>

            <button 
                className="btn-primary my-5"
                
                >
                Agregar al carrito
            </button>

            <h3 className="font-bold text-sm ">Descripcion</h3>
            <p className="font-normal">{product.description}</p>
            
       </div>
       
      
      
    </div>
  );
}