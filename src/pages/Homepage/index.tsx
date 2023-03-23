import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { CustomDatePickerRange } from '../../components/FormComponents/CustomDatePickerRange';
import { CustomInput } from '../../components/FormComponents/CustomInput';

import { DropdownInput } from "../../components/FormComponents/DropdownInput";
import { FilterButton } from "../../components/FormComponents/FilterButton";
import { api } from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import { getLocomotionStatusKeyByValue, getLocomotionStatusValueByKey } from "../../utils/LocomotionStatus";

interface DisplacementsData {
  id: number;
  time: string;
  accepted_at: string;
  finished_at: string;
  origin: string;
  origin_details: string;
  destination: string;
  destination_details: string;
  status: string;
  requester: {
    id: number;
    name: string;
  };
  voluntary: {
    id: number;
    name: string;
  };
}

type ResponseDto = {
  status: boolean;
  message: string;
  data: DisplacementsData[];
};

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
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  async function loadDisplacements(url: string) {
    const response = await api.get<ResponseDto>(url);

    const { data } = response.data;
    const originsAux = new Set<String>();
    const destinationsAux = new Set<String>();
    const statusAux = new Set<String>();
    originsAux.add("Todos");
    destinationsAux.add("Todos");
    statusAux.add("Todos");
    setDisplacements(
      data.map((displacement) => {
        originsAux.add(displacement.origin);
        destinationsAux.add(displacement.destination);
        statusAux.add(getLocomotionStatusValueByKey(displacement.status));
        return {
          ...displacement,
          time: formatDate(displacement.time),
          accepted_at: formatDate(displacement.accepted_at).split(' ').splice(1).toString(),
          finished_at: formatDate(displacement.finished_at).split(' ').splice(1).toString(),
        };
      })
    );
    if (url === "/locomotion/") {
      setOrigins(Array.from(originsAux));
      setDestinations(Array.from(destinationsAux));
      setStatus(Array.from(statusAux));
    }
  }

  useEffect(() => {
    loadDisplacements("/locomotion/");
  }, []);

  const filterData = useCallback(() => {
    async function loadDisplacementsFiltered(originFilter: string, destinationFilter: string, statusFilter: string, requesterFilter: string, voluntaryFilter: string, startDate: Date | null, endDate: Date | null) {
      let url = '/locomotion';
      let addOrFirst;
      if (originFilter && originFilter !== "Todos") {
        url += `?origin=${originFilter.toLowerCase()}`;
      }
      if (destinationFilter && destinationFilter !== "Todos") {
        addOrFirst = url.includes("?") ? "&" : "?";
        url += `${addOrFirst}destination=${destinationFilter.toLowerCase()}`;
      }
      if (statusFilter && statusFilter !== "Todos") {
        addOrFirst = url.includes("?") ? "&" : "?";
        url += `${addOrFirst}status=${getLocomotionStatusKeyByValue(statusFilter)}`;
      }
      if(requesterFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}requester=${requesterFilter}`
      }
      if(voluntaryFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}voluntary=${voluntaryFilter}`
      }
      if(startDate) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}start=${startDate}`
      }
      if(endDate) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}end=${endDate}`
      }
      loadDisplacements(url);
    }
    loadDisplacementsFiltered(originFilter, destinationFilter, statusFilter, requesterFilter, voluntaryFilter, startDate, endDate);
  }, [originFilter, destinationFilter, statusFilter, requesterFilter, voluntaryFilter, startDate, endDate])
  
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

              <div className='mb-[49px] flex items-center flex-col justify-center xl:flex-row gap-10'>
                <div className='flex flex-col w-full'>
                  <div className='flex'>
                    <CustomDatePickerRange onChangeDate={setDateRange} startDate={startDate} endDate={endDate}/>
                    <DropdownInput placeholder='Origem' data={origins} value={originFilter} onChangeValue={setOriginFilter} />
                    <DropdownInput placeholder='Destino' data={destinations} value={destinationFilter} onChangeValue={setDestinationFilter} />
                  </div>
                  <div className='mt-[15px] flex'>
                    <CustomInput placeholder='Solicitante' value={requesterFilter} onChangeText={setRequesterFilter} />
                    <CustomInput placeholder='Voluntário/a' value={voluntaryFilter} onChangeText={setVoluntaryFilter}/>
                    <DropdownInput placeholder='Status' data={status} value={statusFilter} onChangeValue={setStatusFilter} />
                  </div>
                </div>

                <div className='xl:w-[50%] w-[80%]'>
                  <FilterButton onClickValue={filterData}/>
                </div>
              </div>
              <table className='table-auto min-w-full text-center border-collapse border border-[#B9B9B9] overflow-hidden bg-[#fff]'>
                <thead className='bg-[#000000]/5 text-black'>
                  <tr>
                    <th className="border border-[#B9B9B9] px-4 py-2">Horário</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Origem</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Destino</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Solicitante</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Voluntário/a</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Status</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Aceito</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Finalizado</th>
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
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{getLocomotionStatusValueByKey(displacement.status)}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.accepted_at}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.finished_at}</td>
                    </tr>
                )))}                
                </tbody>
              </table>
              {displacements.length === 0 && 
                <div className="bg-[#fff] border border-[#B9B9B9] text-black flex justify-center items-center py-4">Não possui nenhum deslocamento ainda!</div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}