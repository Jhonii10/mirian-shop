import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import bcryptjs from 'bcryptjs';

 
export const authConfig = {
  trustHost:true,
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  

  callbacks:{
    authorized({ auth, request: { nextUrl } }) {
        
        const isLoggedIn = !!auth?.user;
        const isAdmin = auth?.user?.role === 'admin'; 
        const isOnCheckout = ['/checkout','/checkout/address','/orders/'].some(route => nextUrl.pathname.startsWith(route));
        const isProtedRoutes = ['/admin','/admin/products','/admin/users','/admin/orders','/admin/orders/'].some(route => nextUrl.pathname.startsWith(route));
        if (isOnCheckout) {
          if (isLoggedIn) return true;
          return false; 
        }

        if(isProtedRoutes){
            if(isLoggedIn && isAdmin) return true;
            return Response.redirect(new URL('/', nextUrl));
        }

        return true;
      },

    jwt({token , user}) {
        if (user) {
           token.data = user; 
        }
        return token;
    },

    session({session , token, user}) {
        
        session.user = token.data as any;
        
        return session;
    },
  },


  
  providers: [
    Credentials({
        async authorize(credentials) {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(6) })
            .safeParse(credentials);
   
          if (!parsedCredentials.success) return null;

          const {email,password}= parsedCredentials.data;

          // search the email
          const user = await prisma.user.findUnique({
            where: {
                email: email
            }
          })

          if(!user) return null;

          // compare the passwords
          if(!(bcryptjs.compareSync(password,user.password))) return null;


          // return user
          const {password:_, ...rest} = user;

          
          return rest

        },
      }),
  ], // Add providers with an empty array for now
} satisfies NextAuthConfig


export const {signIn,signOut,auth , handlers} = NextAuth(authConfig)