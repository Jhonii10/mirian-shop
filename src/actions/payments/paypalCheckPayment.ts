"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId:string) => {

    

    const authtoken = await getPaypalBearerToken();

    if (!authtoken) {
        return{
            ok:false,
            message:'No se pudo obtener el token de verificacion'
        }
    }

    
        
    const resp = await verifyPayPalPayment(authtoken,paypalTransactionId)
    
    const { status, purchase_units } = resp;

    const {invoice_id:orderId} = purchase_units[0];

    if (status !== 'COMPLETED') {
        return{
            ok:false,
            message:'Aun no se a pagado en Paypal'
        }
    }
    
    try {
        
        await prisma.order.update({
            where:{
                id:orderId,
            },
            data:{
                isPaid:true,
                paidAt:new Date(),
            }
        })

        revalidatePath(`/orders/${orderId}`)

        return{
            ok:true,
            message:'Se ha realizado el pago en paypal',
        }

    } catch (error) {
      console.error(error);
      return {
        ok: false,
        message: '500 - El pago no se pudo realizar'
      }
    }
    
    
}


const getPaypalBearerToken = async ()=>{
   
    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const PAYPAL_OAUTH_URL = process.env.PAYPAL_OAUTH_URL as string;

    const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        'utf-8'
    ).toString('base64')

    try {
        
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow"
    } as any;

    const resp = await fetch(PAYPAL_OAUTH_URL, {...requestOptions, cache:'no-store' } ).then(res => res.json())

    return resp.access_token

    } catch (error) {
      console.error(error)
      return null;    
    }


}

const verifyPayPalPayment = async (authtoken:string , paypalTransactionId:string)=>{

    const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${authtoken}`);

    const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
    } as any;

    try {
        
    const resp = await fetch(`${PAYPAL_ORDERS_URL}/${paypalTransactionId}`, {...requestOptions, cache:'no-store' })
    .then((response) => response.json())

    return resp

    } catch (error) {
        console.error(error);
        return null
    }


}