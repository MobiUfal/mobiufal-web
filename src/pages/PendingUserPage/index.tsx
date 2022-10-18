import { useState, useEffect, useCallback } from 'react'

import 'react-toastify/dist/ReactToastify.css'

import { api } from '../../services/api';

import { CustomInput } from '../../components/FormComponents/CustomInput';
import { DropdownInput } from '../../components/FormComponents/DropdownInput';
import { FilterButton } from '../../components/FormComponents/FilterButton';
import { BsFillEyeFill } from 'react-icons/bs';
// import { UserStatus } from '../../utils/UserStatus';
// import { UserRoles } from '../../utils/UserRoles';

type UserTransiction = {
  id: number;
  name: string;
  role: string;
  aproved: string;
}

type User = {
  id: number;
  name: string;
  role: string;
  approved: string;
}

export function PendingUserPage() {
  const [statusAux, setStatusAux] = useState<String[]>([]);
  const [roleAux, setRoleAux] = useState<String[]>([]);
  let [statusFilter, setStatusFilter] = useState<string>('');
  let [nameFilter, setNameFilter] = useState<string>('');
  let [typeFilter, setTypeFilter] = useState<string>('');

  const [users, setUsers] = useState<User[]>([]);


  async function loadUsers(url: string) {
    const response = await api.get(
      url
    );
    
    const rawUsers: UserTransiction[] = response.data.data;
    console.log(rawUsers)
    const roleAux = new Set<String>();
    const statusAux = new Set<String>();
    statusAux.add('TODOS');
    roleAux.add('TODOS');

    const users: User[] = rawUsers.map(user => {
      statusAux.add(user.aproved);
      roleAux.add(user.role);
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        approved: user.aproved, // update aproved word in backend (change aproved to approved in backend api route return)
      }
    });
  
    
    setUsers(users);
    if(url === '/user/') {
      setStatusAux(Array.from(statusAux));
      setRoleAux(Array.from(roleAux));
    }
  }

  useEffect(() => {
    loadUsers('/user/');
  }, []);

  const filterData = useCallback(() => {
    async function loadUserFiltered(statusFilter: string, nameFilter: string, typeFilter: string) {
      let url = '/user';
      let addOrFirst;
      if(statusFilter && statusFilter !== 'TODOS') {
        url += `?aproved=${statusFilter.toLowerCase()}`
      }
      if(typeFilter  && typeFilter !== 'TODOS') {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}role=${typeFilter.toLowerCase()}`
      }
      if(nameFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}name="${nameFilter.toLowerCase()}"`
      }
      console.log(url)
      loadUsers(url);
    }
    loadUserFiltered(statusFilter, nameFilter, typeFilter);
  }, [statusFilter, nameFilter, typeFilter])

  return (
    <>
      <div className="h-full w-full">
        <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">

          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px] bg-[#FFFCF9]">
            
            <div className="ml-[32px] mt-[31px]flex flex-col">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Gerenciar Usuários</h1>
            </div>


            <div className='px-[60px] mt-[63px] pb-[180px] overflow-x-auto overflow-y-auto h-full w-full'>
              <div className='mb-[49px] flex align-center w-full'>

                <div className='mb-[49px] flex align-center justify-center w-full'>
                  <div className='flex flex-col w-8/12'>
                    <div className='flex'>
                      <CustomInput placeholder='Nome' value={nameFilter} onChangeText={setNameFilter} />
                      <DropdownInput placeholder='Tipo' data={roleAux} value={typeFilter} onChangeValue={setTypeFilter}/>
                      <DropdownInput placeholder='Status' data={statusAux} value={statusFilter} onChangeValue={setStatusFilter} />
                    </div>                  
                  </div>

                  <div className='ml-[37px] flex justify-center w-5/12 w-full align-center'>
                    <FilterButton onClickValue={filterData}/>
                  </div>
                </div>
              </div>
              
              <table className='table-auto min-w-full text-center border-collapse border border-[#B9B9B9] overflow-hidden bg-[#fff]'>
                <thead className='bg-[#000000]/5 text-black'>
                  <tr>
                    <th className="border border-[#B9B9B9] px-4 py-2">Nome</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Tipo</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Status</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Visualizar</th>
                  </tr>
                </thead>

                <tbody>
                  {users.length !== 0 && users.map(user => (

                    <tr key={user.id} >
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{user.name}</td>
                      {/*
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{UserRoles[user.role as keyof typeof UserRoles]}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{UserStatus[user.approved as keyof typeof UserStatus]}</td>
                      */
                      }
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">  
                          <a href={`users/${user.id}`} className="flex justify-center">
                             <BsFillEyeFill size={24} color={"#29AAD7"} />
                          </a>
                      </td>
                    </tr>
                  ))}  

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}