import { getAllUsers } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

export default async function UsersPage() {

    const {ok , users = []} = await getAllUsers();

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <div className='px-0 sm:px-4 '>
      <Title title="Listado de usuarios" />

      <UsersTable users={users}/>
    </div>
  );
}