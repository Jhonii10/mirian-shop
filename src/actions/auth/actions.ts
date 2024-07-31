'use server';
 

import { signIn, signOut } from '@/auth.config';
import { prisma } from '@/lib/prisma';
import bcryptjs from 'bcryptjs';
import { redirect } from 'next/navigation';

export async function authenticate(
prevState: string | undefined,
formData: FormData,
) {
    try {

        await signIn('credentials', {
        ...Object.fromEntries(formData),
        redirect: false,
        });
        
        return 'Success';
        
        
        } catch (error) {
            return 'CredentialsSignin'
        }
    
}


export async function login(email:string , password:string) {
    try {
        await signIn('credentials',{
            email: email,
            password: password,
        })

        return {
            status: 200,
            ok:true
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            ok:false
        }
        
    }
}


export const logOut = async () => {
    await signOut();
}

export const registerUser= async(name:string , email:string , password:string) => {

    try {

        const user = await prisma.user.create({
            data:{
                name:name,
                email:email.toLowerCase(),
                password:bcryptjs.hashSync(password)
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })

        if(user){
            return {
                ok: true,
                message:'Usuario creado',
                user:user
            }
        }

        
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'no se pudo crear el usuario'
        }
    }

   
    
}