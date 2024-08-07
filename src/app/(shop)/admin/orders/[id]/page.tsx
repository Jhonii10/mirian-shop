import { getOrderById } from "@/actions";
import { PayPalButton, Title } from "@/components";;
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";


interface Props {
  params:{
    id: string
  }
}

export default async function OrderIdPage({params}:Props) {

  const {id} = params;

  const {order , ok} = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }
  

  const address = order?.OrderAddress;
  
  


  return (
 <div className="flex justify-center items-center mb-4 sm:mb-72 px-2 sm:px-0">
    <div className="flex flex-col w-[1000px]">
      <Title title={`Pedido No ${id}`}/>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="flex flex-col mt-5 gap-2">
          
        <div className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
              'bg-red-500':order?.isPaid === false,
              'bg-green-600':order?.isPaid === true
              })}>
              <IoCardOutline size={30}/>
              {
                order?.isPaid === true ? (
                  <span className="mx-2">Pagado</span>
                ):(
                  <span className="mx-2">Pendiente de pago</span>
                )
              }
              
        </div>
        

        
          {
            order?.OrderItem?.map((item, index) => (
              <div key={ item.product.slug +'-'+item.size + index} className="flex gap-1 border rounded-lg p-2">
                  <Image
                    src={`/products/${item.product.productImage[0].url}`}
                    alt={item.product.title}
                    width={80}
                    height={80}
                    title={item.product.title}
                    className=" mr-2 rounded-md object-cover"
                  />
                  
                  <div className="flex flex-col justify-around gap-2">
  
                      <p className="text-sm sm:text-md font-semibold">{item.product.title}</p>
                      <p className=" text-sm font-medium">$ {item.price} x {item.quantity}</p>
                      <p className=" text-sm font-bold">Subtotal: {(item.price/1.19 * item.quantity).toFixed(2)}</p>
                      
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
                <p>{address?.firtsName} {address?.lastName}</p>
                <p>{address?.address}</p>
                <p>{address?.postalCode}</p>
                <p>{address?.countryId} {address?.city}</p>
                <p>{address?.phone}</p> 
               </div> 

              <div className="w-full h-px rounded bg-gray-300 my-5"/>

            <h2 className="text-xl mb-2 font-semibold">Resumen del pedido</h2>
            <div className="grid grid-cols-2">
              <span className="font-medium">No Productos</span>
              <span className="text-right">{order?.itemInOrder} articulos</span>

              <span className="font-medium">Subtotal</span>
              <span className="text-right">{currencyFormat(order?.subTotal as number)}</span>

              <span className="font-medium">impuesto 19%</span>
              <span className="text-right">{currencyFormat(order?.tax as number)}</span>

              <span className="font-bold my-2">Total</span>
              <span className="text-right font-bold my-2"  >{currencyFormat(order?.total as number)}</span>
            </div>

            <div className="mt-5 mb-2 w-full">

            <div className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5',{
              'bg-red-500':order?.isPaid === false,
              'bg-green-600':order?.isPaid === true
              })}>
              <IoCardOutline size={30}/>
              {
                order?.isPaid === true ? (
                  <span className="mx-2">Pagado</span>
                ):(
                  <span className="mx-2">Pendiente de pago</span>
                )
              }
              
            </div>

              
  
            </div>

          </div>
          </div>
      

      </div>
    </div>
  </div>
  );
}