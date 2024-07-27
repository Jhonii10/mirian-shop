'use server';
 

import { signIn } from '@/auth.config';

 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
   const email = formData.get('email')
   const password = formData.get('password')

   console.log({email , password});
   
}