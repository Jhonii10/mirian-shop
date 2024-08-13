'use client'
import { login, registerUser } from "@/actions";
import { quicksand } from "@/font";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
}

export default function NewAccountPage() {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(null);
  const router = useRouter();
  

  const onSubmit: SubmitHandler<Inputs> = async(data) =>{
     const {name , email, password } = data;
     const res = await registerUser(name, email , password);

     if (!res?.ok) {
        setErrorMessage(res?.message)
        return;
     }

      await login(email,password);

    
      toast.success('inicio de session exitoso')
      router.push('/')
   
  }

  return (
    <main className="flex flex-col min-h-screen pt-32 ">

    <h1 className={ `${ quicksand.className } text-4xl mb-5` }>Crear cuenta</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

      <label htmlFor="name">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
          "border-red-500 ": errors.name

        })}
        type="text"
        {...register("name", {required:true})} 
        />


      <label htmlFor="email">Correo electronico</label>
      <input
         className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
          "border-red-500 ": errors.email

        })}
        type="email" 
        {...register("email", { required:true, pattern:/^\S+@\S+$/i })} 
        />


      <label htmlFor="password">Contraseña</label>
      <input
         className={clsx("px-5 py-2 border bg-gray-200 rounded mb-5",{
          "border-red-500 ": errors.password

        })}
        type="password"
        placeholder="********"
        {...register("password", {required:true , minLength:6})}
        />

      <button
        type="submit"
        className="btn-primary">
        Crear cuenta
      </button>


      {/* divisor l ine */ }
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link
        href="/auth/login" 
        className="btn-secondary text-center">
        Iniciar seccion
      </Link>

    </form>
  </main>
  );
}