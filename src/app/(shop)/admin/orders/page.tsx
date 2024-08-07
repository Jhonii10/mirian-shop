import { getOrdersByAdmin } from '@/actions';
import { Title } from '@/components';
import clsx from 'clsx';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

export default async function OrdersPage() {


  const {ok , orders} = await getOrdersByAdmin();

  if (!ok) {
    redirect('/auth/login')
  }


  return (
    <div className='px-0 sm:px-4 '>
      <Title title="Todos las ordenes" />

      <div className="mb-10 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full ">
          <thead className="bg-gray-200 border-b ">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Item
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nombre completo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Estado
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {
              orders?.map((order , index)=>(
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={order.id}>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.firtsName} {order.OrderAddress?.lastName} 
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
  
                  <IoCardOutline className={clsx({
                    "text-green-800":order.isPaid,
                    "text-red-800":!order.isPaid
                    })} />
                  {
                    order.isPaid ? (
                      <span className='mx-2 text-green-800 font-medium text-md'>Pagada</span>
                    ):
                    (
                      <span className='mx-2 text-red-800 font-medium text-md'>No Pagada</span>
                    )
                  }
                  
  
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/admin/orders/${order.id}`} className="hover:underline font-medium">
                    Ver orden
                  </Link>
                </td>
  
              </tr>
              ))
            }


          </tbody>
        </table>
      </div>
    </div>
  );
}