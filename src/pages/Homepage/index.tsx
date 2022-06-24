import { useEffect, useState } from 'react';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { api } from '../../services/api';
import { formatDate } from '../../utils/formatDate';

const paths = [
  {
    pathName: 'Página inicial',
    link: '/displacements'
  }
];

interface DisplacementsData {
  id: number;
  time: string;
  origin: string;
  origin_details: string;
  destination: string;
  destination_details: string;
  status: number;
  requester: {
    id: number;
    name: string;
  }
  voluntary: {
    id: number;
    name: string;
  }
}

type ResponseDto = {
  status: boolean;
  message: string;
  data: DisplacementsData[];
}


export function Homepage() {
  const [displacements, setDisplacements] = useState<DisplacementsData[]>([]);

  useEffect(() => {
    async function loadDisplacements() {
      const response = await api.get<ResponseDto>(
        '/locomotion/',
      );
      
      const { data } = response.data;
      setDisplacements(
        data.map(displacement  => {
          return {
            ...displacement,
            time: formatDate(displacement.time),
          };
        }),
      );
    }

    loadDisplacements();
  }, []);
  
  return (
    <>    
      <div className="h-full w-full">
        <div className="container mx-auto md:container md:mx-auto mt-[22px] px-[67px]">

          <Breadcrumbs paths={paths}/>
        </div>
        <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">

          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px]">
            
            <div className="ml-[32px] mt-[31px] flex flex-col">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Últimos deslocamentos</h1>
              
              <span className='text-[#000000]/60 mt-[12px]'>Acompanhe em tempo real tudo o que está acontecendo</span>
            </div>

            <div className='px-[60px] mt-[63px] pb-[180px] overflow-x-auto overflow-y-auto h-full w-full'>
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
                {displacements.length !== 0 && (displacements.map(displacement => (

                    <tr key={displacement.id} className="border border-black">
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.time}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.origin}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.destination}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.requester.name}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.voluntary ? displacement.voluntary.name : "Procurando..."}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.status}</td>
                    </tr>
                )))}                
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}