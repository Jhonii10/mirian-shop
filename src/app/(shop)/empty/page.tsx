import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function EmptyPage() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
        <IoCartOutline size={80} className="mx-5"/>
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-semibold">Tu carrito esta vacio</h1>
          <Link 
            href={'/'}
            className="text-blue-500 mt-2 text-xl font-semibold hover:font-bold"
            >
            Volver a la tienda
          </Link>

        </div>
    </div>
  );
}