import { Title } from "@/components";
import { AddressForm } from "./ui/AddressForm";
import { getContries, getUserAddress } from "@/actions";
import { auth } from "@/auth.config";

export default async function AddressPage() {

  const countries = await getContries();
  const session = await auth();
  const userStoreAddress = await getUserAddress(session?.user.id);

  
  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-16 px-10 sm:px-0">



      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoreAddress={userStoreAddress}/>

      </div>




    </div>
  );
}