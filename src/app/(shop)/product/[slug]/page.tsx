import { getProductByslug } from "@/actions";
import { ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { quicksand } from "@/font";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from 'next'

interface Props {
    params:{
        slug:string;
    }
}


  
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params;

 
  // fetch data
  const product = await getProductByslug(slug)
  console.log(product);
  
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? 'Producto no encontrado',

    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? 'Producto no encontrado',
      images: [`/products/${product?.images[0 | 1]}`],
    },
  }
}


export default async function ProductSlugPage({params}:Props) {

    const {slug} = params;
    const product = await getProductByslug(slug)


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
            <StockLabel slug={product.slug} />
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