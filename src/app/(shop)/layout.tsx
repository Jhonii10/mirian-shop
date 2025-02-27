import { auth } from "@/auth.config";
import { Footer, Sidebar, TopMenu } from "@/components";
import { Toaster } from "react-hot-toast";

export default async function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {

  const session = await auth()

  return (
    <main className="min-h-screen ">
      <TopMenu/>
      <Sidebar session={session}/>
      <div className="px-4">
      {children}
      </div>
      <Footer/>
    </main>
  );
}