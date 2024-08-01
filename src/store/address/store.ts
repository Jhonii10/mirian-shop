import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    address:{
        firtsName: string;
        lastName: string;
        address: string;
        address_2?: string;
        postalCode: string;
        city:string;
        country: string;
        phone: string;
    };

    setAddress: (address:State['address'])=>void;

}

export const useAddressStore = create<State>()(
    persist(
    (set,get) => ({

        address:{
            firtsName:'',
            lastName:'',
            address:'',
            address_2:'',
            postalCode:'',
            city:'',
            country:'',
            phone:'',
        },
        
        setAddress(address){
            set({address})
            
        }

        
        
    }),
    {
        name: 'address',
    }


)
)