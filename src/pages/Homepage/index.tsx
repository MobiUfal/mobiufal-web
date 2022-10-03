import { useEffect, useState } from 'react';
// import { Breadcrumbs } from '../../components/Breadcrumbs';
import { DropdownInput } from '../../components/FormComponents/DropdownInput';
import { CustomInput } from '../../components/FormComponents/CustomInput';
import { FilterButton } from '../../components/FormComponents/FilterButton';
import { api } from '../../services/api';
import { formatDate } from '../../utils/formatDate';

interface DisplacementsData {
  id: number;
  time: string;
  origin: string;
  origin_details: string;
  destination: string;
  destination_details: string;
  status: string;
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
  const [origins, setOrigins] = useState<String[]>([]);
  const [destinations, setDestinations] = useState<String[]>([]);
  const [status, setStatus] = useState<String[]>([]);

  useEffect(() => {
    async function loadDisplacements() {
      const response = await api.get<ResponseDto>(
        '/locomotion/',
      );
      
      const { data } = response.data;
      const originsAux = new Set<String>();
      const destinationsAux = new Set<String>();
      const statusAux = new Set<String>();
      setDisplacements(
        data.map(displacement  => {
          originsAux.add(displacement.origin);
          destinationsAux.add(displacement.destination);
          statusAux.add(displacement.status);
          return {
            ...displacement,
            time: formatDate(displacement.time),
          };
        }),
      );
      setOrigins(Array.from(originsAux));
      setDestinations(Array.from(destinationsAux));
      setStatus(Array.from(statusAux));
    }

    loadDisplacements();
  }, []);
  
  return (
    <>    
      <div className="h-full w-full">
        <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">

          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px] bg-[#FFFCF9]">
            
            <div className="ml-[32px] mt-[31px] flex flex-col">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Últimos deslocamentos</h1>
              
              <span className='text-[#000000]/60 mt-[12px]'>Acompanhe em tempo real tudo o que está acontecendo</span>
            </div>

            <div className='px-[60px] mt-[63px] pb-[180px] overflow-x-auto overflow-y-auto h-full'>

              <div className='mb-[49px] flex align-center w-full'>
                <div className='flex flex-col w-8/12'>
                  <div className='flex'>
                    <CustomInput placeholder='Data'/>
                    <DropdownInput placeholder='Origem' data={origins} />
                    <DropdownInput placeholder='Destino' data={destinations} />
                  </div>
                  <div className='mt-[15px] flex'>
                    <CustomInput placeholder='Solicitante'/>
                    <CustomInput placeholder='Voluntário'/>
                    <DropdownInput placeholder='Status' data={status} />
                  </div>
                </div>

                <div className='ml-[37px] flex justify-center w-5/12 w-full align-center py-[37px]'>
                  <FilterButton />
                </div>
              </div>
              <table className='table-auto min-w-full text-center border-collapse border border-[#B9B9B9] overflow-hidden bg-[#fff]'>
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