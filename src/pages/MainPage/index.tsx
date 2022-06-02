import React from 'react';

import Header from '../../components/Header';
import { Breadcrumbs } from '../../components/Breadcrumbs';

const MainMenu: React.FC = () => {
  const paths = [
    {
      pathName: 'Página inicial',
      link: 'deslocamentos'
    }
  ];

  return (
    <>    
      <div className="flex h-screen">
        <Header />
        
        <div className="container  mx-auto md:container md:mx-auto py-[126px] px-[67px]">
          <Breadcrumbs paths={paths}/>

          <div className="h-full mt-20 border-solid border-2 border-[#000000]-600 rounded-[15px]">
            
            <div className="ml-8 flex flex-col">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Últimos deslocamentos</h1>
              
              <span className='text-[#000000]/60 mt-[12px]'>Acompanhe em tempo real tudo o que está acontecendo</span>
            </div>

            <div className='px-[60px] mt-[58px] overflow-x-auto overflow-y-auto h-full w-full'>
              <table className='table-auto min-w-full text-center border-collapse border border-[#B9B9B9] overflow-hidden '>
                <thead className='bg-[#000000]/5 text-black'>
                  <tr>
                    <th className="border border-[#B9B9B9] px-4 py-2">Horário</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Origem</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Destino</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Solicitante</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Voluntário</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">27/05/2022, 17:00</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">IM, sala 2</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Biblioteca</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Sandro</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Procurando...</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Pendente</td>
                  </tr>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">27/05/2022, 17:00</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">IM, sala 2</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Biblioteca</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Sandro</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Procurando...</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Pendente</td>
                  </tr>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">27/05/2022, 17:00</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">IM, sala 2</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Biblioteca</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Sandro</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Procurando...</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Pendente</td>
                  </tr>
                  <tr className="border border-black">
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">27/05/2022, 17:00</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">IM, sala 2</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Biblioteca</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Sandro</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Procurando...</td>
                    <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">Pendente</td>
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

export default MainMenu;