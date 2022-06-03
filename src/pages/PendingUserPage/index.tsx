import { Breadcrumbs } from '../../components/Breadcrumbs';
import { TiDeleteOutline } from 'react-icons/ti'; 
import { AiOutlineCheckCircle } from 'react-icons/ai'; 
import { HiOutlineDotsCircleHorizontal as HiDotsCircle } from 'react-icons/hi';
import { useState } from 'react'
import { InfoModal } from '../../components/InfoModal';

const paths = [
  {
    pathName: 'Gerenciar Usuários',
    link: '/gerenciar-usuarios/usuarios-pendentes'
  },
  {
    pathName: 'Usuários pendentes',
    link: '/gerenciar-usuarios/usuarios-pendentes'
  }
];

type User = {
  name: string;
  email: string;
  cpf: string;
  phone_number: string;
  linkWithUfal: string;
  course: string;
  experience: string;
}

const user: User = {
  name: "Amanda",
  email: "amdl@ic.ufal.br",
  cpf: "213.123.123-45",
  phone_number: "(31)99312-1234",
  linkWithUfal: "Discente",
  course: "Ciencia da computacao",
  experience: "Sim"
}

export function PendingUserPage() {

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <InfoModal isOpen={isOpen} closeModal={closeModal} user={user} />
      <div className="h-full w-full">
        <div className="container mx-auto md:container md:mx-auto mt-[22px] px-[67px]">
          <Breadcrumbs paths={paths}/>
        </div>

        <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">

          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px]">
            
            <div className="ml-[32px] mt-[31px]flex flex-col">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Últimos deslocamentos</h1>
              
              <span className='text-[#000000]/60 mt-[12px]'>Acompanhe em tempo real tudo o que está acontecendo</span>
            </div>

            <div className='px-[60px] mt-[63px] pb-[180px] overflow-x-auto overflow-y-auto h-full w-full'>
              <table className='table-auto min-w-full text-center border-collapse border border-[#B9B9B9] overflow-hidden '>
                <thead className='bg-[#000000]/5 text-black'>
                  <tr>
                    <th className="border border-[#B9B9B9] px-4 py-2">Nome</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Tipo</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Status</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Amanda</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Voluntário</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Aguardando aprovação</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      <div className='flex justify-center align-center'>
                        <button className='mr-[18px]'>
                          <TiDeleteOutline size={34.5} color={"#FF0000"} />
                        </button>
                        <button className='mr-[18px]'>
                          <AiOutlineCheckCircle size={30} color={"#40F600"} />
                        </button>
                        <button onClick={() => openModal()}>
                          <HiDotsCircle size={31} color={"#1F3E8C"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Paula</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Solicitante</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Aguardando aprovação</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      <div className='flex justify-center align-center'>
                        <button className='mr-[18px]'>
                          <TiDeleteOutline size={34.5} color={"#FF0000"} />
                        </button>
                        <button className='mr-[18px]'>
                          <AiOutlineCheckCircle size={30} color={"#40F600"} />
                        </button>
                        <button>
                          <HiDotsCircle size={31} color={"#1F3E8C"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Fernando</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Solicitante</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Aguardando aprovação</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      <div className='flex justify-center align-center'>
                        <button className='mr-[18px]'>
                          <TiDeleteOutline size={34.5} color={"#FF0000"} />
                        </button>
                        <button className='mr-[18px]'>
                          <AiOutlineCheckCircle size={30} color={"#40F600"} />
                        </button>
                        <button>
                          <HiDotsCircle size={31} color={"#1F3E8C"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Michael Jackson</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Solicitante</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Acesso bloqueado</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                      <div className='flex justify-center align-center'>
                        <button className='mr-[18px]'>
                          <TiDeleteOutline size={34.5} color={"#FF0000"} />
                        </button>
                        <button className='mr-[18px]'>
                          <AiOutlineCheckCircle size={30} color={"#40F600"} />
                        </button>
                        <button>
                          <HiDotsCircle size={31} color={"#1F3E8C"} />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}