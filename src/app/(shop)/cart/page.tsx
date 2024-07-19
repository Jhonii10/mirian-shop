import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { RiDeleteBin6Line } from "react-icons/ri";

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  // initialData.products[2],
]

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-4 sm:mb-72 px-2 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex flex-col mt-5 gap-2">
            <span className="text-xl">Agregar mas items</span>
            <Link 
              href={'/'}
              className="hover:underline mb-5"
              >
              Continuar comprando
            </Link>
          

          
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
                        <p className="font-semibold">$ {product.price}</p>
                         <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 ">
                          <QuantitySelector quantity={1}/>
                        <button className="ml-0 sm:ml-2 ">
                          {<RiDeleteBin6Line size={25}  className="ml-0 sm:ml-5 text-zinc-500  hover:text-red-500"/>}
                        </button>

                         </div>
                        
                    </div>
                </div>
              ))
            }
            </div>


            {/* checkout */}
            <div>
            <div className="bg-white rounded-lg shadow-xl p-7">
              <h2 className="text-xl mb-2 font-semibold">Resumen del pedido</h2>
              <div className="grid grid-cols-2">
                <span className="font-medium">No Productos</span>
                <span className="text-right">3 articulos</span>

                <span className="font-medium">Subtotal</span>
                <span className="text-right">$100</span>

                <span className="font-medium">impuesto 19%</span>
                <span className="text-right">$19</span>

                <span className="font-medium">Total</span>
                <span className="text-right"  >$119</span>
              </div>

              <div>
                <Link 
                  href={'/checkout'}
                  className="btn-primary flex justify-center mt-2 "
                  >
                  Pagar
                </Link>
              </div>

            </div>
            </div>
        

        </div>
      </div>
    </div>
  );
}