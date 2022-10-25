import { useCallback, useEffect, useState } from 'react';
import { CustomInput } from '../../components/FormComponents/CustomInput';

import { DropdownInput } from '../../components/FormComponents/DropdownInput';
import { FilterButton } from '../../components/FormComponents/FilterButton';
import { api } from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { LocomotionStatus } from '../../utils/LocomotionStatus';

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
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [originFilter, setOriginFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [requesterFilter, setRequesterFilter] = useState<string>('');
  const [voluntaryFilter, setVoluntaryFilter] = useState<string>('');

  async function loadDisplacements(url: string) {
    const response = await api.get<ResponseDto>(
      url
    );
    
    const { data } = response.data;
    const originsAux = new Set<String>();
    const destinationsAux = new Set<String>();
    const statusAux = new Set<String>();
    originsAux.add('TODOS');
    destinationsAux.add('TODOS');
    statusAux.add('TODOS');
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
    if(url === '/locomotion/') {
      setOrigins(Array.from(originsAux));
      setDestinations(Array.from(destinationsAux));
      setStatus(Array.from(statusAux));
    }
  }

  useEffect(() => {
    loadDisplacements('/locomotion/');
  }, []);


  const filterData = useCallback(() => {
    async function loadDisplacementsFiltered(originFilter: string, destinationFilter: string, statusFilter: string, requesterFilter: string, voluntaryFilter: string) {
      let url = '/locomotion';
      let addOrFirst;
      if(originFilter && originFilter !== 'TODOS') {
        url += `?origin=${originFilter.toLowerCase()}`
      }
      if(destinationFilter  && destinationFilter !== 'TODOS') {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}destination=${destinationFilter.toLowerCase()}`
      }
      if(statusFilter  && statusFilter !== 'TODOS') {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}status=${statusFilter.toLowerCase()}`
      }
      if(requesterFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}requester="${requesterFilter.toLowerCase()}"`
      }
      if(voluntaryFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}voluntary=${voluntaryFilter.toLowerCase()}`
      }
      loadDisplacements(url);
    }
    loadDisplacementsFiltered(originFilter, destinationFilter, statusFilter, requesterFilter, voluntaryFilter);
  }, [originFilter, destinationFilter, statusFilter, requesterFilter, voluntaryFilter])
  
  return (
    <>    
      <div className="h-full w-full">
        <div className="container mx-auto py-24 px-16">

          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px] bg-[#FFFCF9] px-4">
            
            <div className="ml-[32px] mt-[31px] flex flex-col">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Últimos deslocamentos</h1>
              
              <span className='text-[#000000]/60 mt-[12px]'>Acompanhe em tempo real tudo o que está acontecendo</span>
            </div>

            <div className='px-[60px] mt-[63px] pb-[180px] flex flex-col'>

              <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mb-9 gap-2'>
               
                
                    <DropdownInput placeholder='Origem' data={origins} value={originFilter} onChangeValue={setOriginFilter} />
                    <DropdownInput placeholder='Destino' data={destinations} value={destinationFilter} onChangeValue={setDestinationFilter} />
                  
                    <CustomInput placeholder='Solicitante' value={requesterFilter} onChangeText={setRequesterFilter} />
                    <CustomInput placeholder='Voluntário' value={voluntaryFilter} onChangeText={setVoluntaryFilter}/>
                    <DropdownInput placeholder='Status' data={status} value={statusFilter} onChangeValue={setStatusFilter} />
                  
                    </div>

                <div className='w-52 mb-14'>
                  <FilterButton onClickValue={filterData}/>
                </div>

             <div className='overflow-auto w-full'>
             <table className='table-auto text-center border-collapse border border-[#B9B9B9] bg-[#fff]'>
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
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{LocomotionStatus[displacement.status as keyof typeof LocomotionStatus]}</td> 
                    </tr>
                )))}                
                </tbody>
              </table>
              </div> 
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}