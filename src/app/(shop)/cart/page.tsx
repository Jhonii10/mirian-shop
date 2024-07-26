
import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ProductsInCart } from "./ui/ProductsInCart";
import { useCartStore } from "@/store";
import { OrderSummary } from "./ui/OrderSummary";



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
          

          
            <ProductsInCart />
            </div>


            {/* checkout */}
            <OrderSummary/>
        

        </div>
      </div>
    </div>
  );
}