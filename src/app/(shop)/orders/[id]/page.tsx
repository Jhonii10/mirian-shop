import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  // initialData.products[2],
]

interface Props {
  params:{
    id: string
  }
}

export default function OrderIdPage({params}:Props) {

  const {id} = params;

  return (
 <div className="flex justify-center items-center mb-4 sm:mb-72 px-2 sm:px-0">
    <div className="flex flex-col w-[1000px]">
      <Title title={`Pedido No ${id}`}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex flex-col mt-5 gap-2">
          
          <div className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
              'bg-red-500':false,
              'bg-green-600':true
          })}>
            <IoCardOutline size={30}/>
            {/* <span className="mx-2">Pendiente de pago</span> */}
            <span className="mx-2">Pagado</span>
          </div>
        

        
          {
            productInCart.map((product) => (
              <div key={product.slug} className="flex gap-1 border rounded-lg p-2">
                  <Image
                    src={`/products/${product.images[0]}`}
                    alt={product.title}
                    width={80}
                    height={80}
                    title={product.title}
                    className=" mr-2 rounded-md object-cover"
                  />
                  
                  <div className="flex flex-col justify-around gap-2">
  
                      <p className="text-sm sm:text-md font-semibold">{product.title}</p>
                      <p className=" text-sm font-medium">$ {product.price} x 3</p>
                      <p className=" text-sm font-bold">Subtotal: {product.price}</p>
                      
                  </div>
              </div>
            ))
          }
          </div>


          {/* checkout */}
          <div>
          <div className="bg-white rounded-lg shadow-xl p-7">

              <h2 className="text-xl mb-2">Direccion de entrega</h2>
               <div>
                <p>Jhoni ipia</p>
                <p>Avenida siempre viva 123</p>
                <p>col centro</p>
                <p>santiago de cali</p>
                <p>1234567</p> 
               </div> 

              <div className="w-full h-px rounded bg-gray-300 my-5"/>

            <h2 className="text-xl mb-2 font-semibold">Resumen del pedido</h2>
            <div className="grid grid-cols-2">
              <span className="font-medium">No Productos</span>
              <span className="text-right">3 articulos</span>

              <span className="font-medium">Subtotal</span>
              <span className="text-right">$100</span>

              <span className="font-medium">impuesto 19%</span>
              <span className="text-right">$19</span>

              <span className="font-bold">Total</span>
              <span className="text-right font-bold"  >$119</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              
            <div className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
              'bg-red-500':false,
              'bg-green-600':true
              })}>
              <IoCardOutline size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagado</span>
            </div>
            </div>

          </div>
          </div>
      

      </div>
    </div>
  </div>
  );
}