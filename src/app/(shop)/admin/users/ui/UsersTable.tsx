'use client';

import { changeUserRole } from '@/actions';
import { User } from '@/interfaces'
import React from 'react'

interface Props {
    users: User[]
}

export const UsersTable = ({users}:Props) => {
  return (
    <div className="mb-10 overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full ">
          <thead className="bg-gray-200 border-b ">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Item
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Email
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">        
                Nombre
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {
              users?.map((user , index)=>(
                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={user.id}>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index+1}</td>
                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-medium px-6 py-4 whitespace-nowrap capitalize">
  
                 {user.name}
                </td>
                <td className="text-sm text-gray-900 font-medium px-6 ">
                  <select 
                    className="w-2/4 min-w-20 p-2 border rounded-md bg-gray-100"
                    title="role"
                    value={user.role}
                    onChange={e =>  changeUserRole(user.id , e.target.value)}
                    >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                </select>
                </td>
  
              </tr>
              ))
            }


          </tbody>
        </table>
      </div>
  )
}
