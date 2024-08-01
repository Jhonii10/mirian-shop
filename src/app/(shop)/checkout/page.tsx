import { Title } from "@/components";
import Link from "next/link";
import { ProductsInCart } from "./ui/ProductsInCart";
import { PlaceOrders } from "./ui/PlaceOrders";



export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-4 sm:mb-72 px-2 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar pedido"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="flex flex-col mt-5 gap-2">
            <span className="text-xl">Ajustar elementos</span>
            <Link 
              href={'/cart'}
              className="hover:underline mb-5"
              >
              Editar compra
            </Link>
          

            {/* products in cart */}
            <ProductsInCart/>
            </div>
            
            {/* checkout */}
            <PlaceOrders/>
        

        </div>
      </div>
    </div>
  );
}