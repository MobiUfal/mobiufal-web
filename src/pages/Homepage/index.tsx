import { DataTable, DataTableSelection, DataTableProps } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useCallback, useEffect, useState } from 'react';
import { CustomDatePickerRange } from '../../components/FormComponents/CustomDatePickerRange';
import { CustomInput } from '../../components/FormComponents/CustomInput';

import { DropdownInput } from "../../components/FormComponents/DropdownInput";
import { FilterButton } from "../../components/FormComponents/FilterButton";
import { api } from "../../services/api";
import { formatDate } from "../../utils/formatDate";
import { getLocomotionStatusKeyByValue, getLocomotionStatusValueByKey } from "../../utils/LocomotionStatus";
import { DisplacementsModal } from '../../components/DisplacementsModal';


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

  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const [displacementInformation, setDisplacementInformation] = useState<DataTableSelection<DisplacementsData[]>>();

  async function loadDisplacements(url: string) {
    const response = await api.get<ResponseDto>(url);

    const { data } = response.data;
    const requestedDisplacements = data;

    const originsAux = new Set<String>();
    const destinationsAux = new Set<String>();
    const statusAux = new Set<String>();
    originsAux.add("Todos");
    destinationsAux.add("Todos");
    statusAux.add("Todos");
    const displacements = requestedDisplacements.map((displacement) => {
      const status = getLocomotionStatusValueByKey(displacement.status)
      originsAux.add(displacement.origin);
      destinationsAux.add(displacement.destination);
      statusAux.add(status);
      return {
        ...displacement,
        time: formatDate(displacement.time),
        accepted_at: formatDate(displacement.accepted_at).split(' ').splice(1).toString(),
        finished_at: formatDate(displacement.finished_at).split(' ').splice(1).toString(),
        status: status
      };
    });
    setDisplacements(displacements);
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
      if (requesterFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}requester=${requesterFilter}`
      }
      if (voluntaryFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}voluntary=${voluntaryFilter}`
      }
      if (startDate) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}start=${startDate}`
      }
      if (endDate) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}end=${endDate}`
      }
      loadDisplacements(url);
    }
    loadDisplacementsFiltered(originFilter, destinationFilter, statusFilter, requesterFilter, voluntaryFilter, startDate, endDate);
  }, [originFilter, destinationFilter, statusFilter, requesterFilter, voluntaryFilter, startDate, endDate])

  const checkVoluntary = (displacement: any) => {
    return displacement.voluntary ? displacement.voluntary.name : "Procurando...";
  };

  const handleDisplacementClickOpen = (displacement :  DisplacementsData | any): void => {
    setIsOpen(true);
    setDisplacementInformation(displacement);
  }

  const handleDisplacementClickClose = (): void => {
    setIsOpen(false);
    setDisplacementInformation(undefined);
  }

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
                    <CustomDatePickerRange onChangeDate={setDateRange} startDate={startDate} endDate={endDate} />
                    <DropdownInput placeholder='Origem' data={origins} value={originFilter} onChangeValue={setOriginFilter} />
                    <DropdownInput placeholder='Destino' data={destinations} value={destinationFilter} onChangeValue={setDestinationFilter} />
                  </div>
                  <div className='mt-[15px] flex'>
                    <CustomInput placeholder='Solicitante' value={requesterFilter} onChangeText={setRequesterFilter} />
                    <CustomInput placeholder='Voluntário/a' value={voluntaryFilter} onChangeText={setVoluntaryFilter} />
                    <DropdownInput placeholder='Status' data={status} value={statusFilter} onChangeValue={setStatusFilter} />
                  </div>
                </div>

                <div className='xl:w-[50%] w-[80%]'>
                  <FilterButton onClickValue={filterData} />
                </div>
              </div>
              {isOpen && <DisplacementsModal info={displacementInformation} handleDisplacementClickClose={handleDisplacementClickClose} />}
              <DataTable
                value={displacements}
                removableSort
                showGridlines
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '60rem' }}
                emptyMessage="Não possui nenhum deslocamento ainda!"
                selectionMode="single"
                selection={displacementInformation}
                onSelectionChange={(e) => handleDisplacementClickOpen(e.value)}
              >
                <Column field="origin" header="Origem" sortable></Column>
                <Column field="destination" header="Destino" sortable></Column>
                <Column field="requester.name" header="Solicitante" sortable></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}