"use server"

import { Address } from "@/interfaces"
import { prisma } from "@/lib/prisma"

export const setUserAddres = async(address:Address , userId:string) => {
        
    try {
        
        const newAddres = await createReplaceAddress(address , userId)
        
        
        if (newAddres?.ok) {
            return {
                ok: true,
                address:newAddres
            }
        }
        
    } catch (error) {
        console.error(error);
        return{
            ok:false,
            message:'no se pudo guardar la direccion'
        }
    }
}

const createReplaceAddress = async(address:Address , userId:string)=>{
        
    try {

        const storeAddress = await prisma.userAddress.findUnique({
            where:{userId}
        })
 

        const addressToSave = {
            userId:userId,
            address:address.address,
            address_2:address.address_2,
            countryId:address.country,
            firtsName: address.firtsName,
            lastName:address.lastName,
            phone:address.phone,
            postalCode: address.postalCode,
            city:address.city
            
        }

        
        

        if (!storeAddress) {
           const newAddress = await prisma.userAddress.create({
            data:addressToSave as any
           }) 

           return {
             ok:true,
             newAddress:newAddress
           }
        }

        const updatedAddress = await prisma.userAddress.update({
            where:{userId},
            data: addressToSave as any
        })
        
        return {
            ok:true,
            updatedAddress:updatedAddress
        }
    } catch (error) {
        console.log(error)
        return{
            ok:false,
            message:'no se pudo guardar la direccion'
        }
        
    }
}