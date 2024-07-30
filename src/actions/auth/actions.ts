'use server';
 

import { signIn, signOut } from '@/auth.config';

 
// ...
 
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

    export const logOut = async () => {
        await signOut();
    }