import { quicksand } from "@/font";
import Link from "next/link";
import { LoginForm } from "./ui/LoginForm";

export default function AuthPage() {
  return (
    <main className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ quicksand.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm/>
    </main>
  );
}