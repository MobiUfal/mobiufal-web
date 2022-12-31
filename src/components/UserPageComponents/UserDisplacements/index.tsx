import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { formatDate } from "../../../utils/formatDate";
import { getLocomotionStatusValueByKey } from "../../../utils/LocomotionStatus";
import { CustomDatePickerRange } from "../../FormComponents/CustomDatePickerRange";
import { DropdownInput } from "../../FormComponents/DropdownInput";
import { FilterButton } from "../../FormComponents/FilterButton";

type Displacement = {
  id: number;
  time: string;
  accepted_at: string;
  finished_at: string;
  source: string;
  destination: string;
  requesterName: string;
  status: string;
};

interface UserDisplacementsProps {
  userId: string | undefined;
  name: string;
}

export function UserDisplacements({ userId, name }: UserDisplacementsProps) {
    const [userDisplacements, setUserDisplacements] = useState<Displacement[]>([] as Displacement[]);
    const [destinationFilter, setDestinationFilter] = useState<string>('');
    const [originFilter, setOriginFilter] = useState<string>('');
    const [origins, setOrigins] = useState<String[]>([]);
    const [destinations, setDestinations] = useState<String[]>([]);
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;

  async function loadData(url: string) {
    const response = await api.get(url);
    const { data } = response;
    const requestedDisplacements = data.data.requested;

    const originsAux = new Set<String>();
    const destinationsAux = new Set<String>();
    originsAux.add("Todos");
    destinationsAux.add("Todos");
    const displacements = requestedDisplacements.map((displacement: any) => {
      originsAux.add(displacement.origin);
      destinationsAux.add(displacement.destination);
      return {
        id: displacement.id,
        time: formatDate(displacement.time),
        source: displacement.origin,
        destination: displacement.destination,
        requesterName: displacement.requester.name,
        status: getLocomotionStatusValueByKey(displacement.status),
        accepted_at: formatDate(displacement.accepted_at).split(' ').splice(1).toString(),
        finished_at: formatDate(displacement.finished_at).split(' ').splice(1).toString(),
      };
    });
    setUserDisplacements(displacements);
    if (!url.includes("?")) {
      setOrigins(Array.from(originsAux));
      setDestinations(Array.from(destinationsAux));
    }
  }

  useEffect(() => {
    loadData(`/locomotion/user/${userId}`);
  }, []);

    const filterData = useCallback(() => {
      async function loadDisplacementsFiltered(originFilter: string, destinationFilter: string, startDate: Date | null, endDate: Date | null) {
        let url = `/locomotion/user/${userId}`;
        let addOrFirst;
        if(originFilter && originFilter !== 'Todos') {
          url += `?origin=${originFilter.toLowerCase()}`
        }
        if(destinationFilter  && destinationFilter !== 'Todos') {
          addOrFirst = url.includes('?') ? '&' : '?';
          url += `${addOrFirst}destination=${destinationFilter.toLowerCase()}`
        }
        if(startDate) {
          addOrFirst = url.includes('?') ? '&' : '?';
          url += `${addOrFirst}start=${startDate}`
        }
        if(endDate) {
          addOrFirst = url.includes('?') ? '&' : '?';
          url += `${addOrFirst}end=${endDate}`
        }
        loadData(url);
      }
      loadDisplacementsFiltered(originFilter, destinationFilter, startDate, endDate);
    }, [originFilter, destinationFilter, startDate, endDate])

    return (
        <div className="flex flex-col gap-6 w-10/12">
            <h1 className="text-3xl font-medium leading-9 text-black">Deslocamentos de {name}</h1>

              <div className='flex'>
                <div className='flex w-full'>
                  <CustomDatePickerRange onChangeDate={setDateRange} startDate={startDate} endDate={endDate}/>
                  <DropdownInput placeholder='Origem' data={origins} value={originFilter} onChangeValue={setOriginFilter} />
                  <DropdownInput placeholder='Destino' data={destinations} value={destinationFilter} onChangeValue={setDestinationFilter} />
                </div>
                <div className='ml-[37px] flex justify-center w-3/12 align-center'>
                  <FilterButton onClickValue={filterData}/>
                </div>
              </div>
			
			<div>
				<table className='table-auto block max-h-80 overflow-y-scroll text-center border-collapse border border-[#B9B9B9] bg-[#fff]'>
					<thead className='bg-[#000000]/5 text-black'>
					<tr>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Horário</th>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Origem</th>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Destino</th>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Solicitante</th>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Status</th>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Aceito</th>
						<th className="border border-[#B9B9B9] px-4 py-2 w-3/12">Finalizado</th>
					</tr>
					</thead>
					<tbody>
						{userDisplacements.length !== 0 && (userDisplacements.map(displacement => (
							<tr key={displacement.id} className="border border-black">
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.time}</td>
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.source}</td>
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.destination}</td>
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.requesterName}</td>
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.status}</td>
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.accepted_at}</td>
								<td className="border border-[#B9B9B9] px-6 py-4 w-3/12 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.finished_at}</td>
							</tr>
						)))}                
					</tbody>
				</table>
				{userDisplacements.length === 0 && 
					<div className="bg-[#fff] border border-[#B9B9B9] text-black flex justify-center items-center py-4">Não possui nenhum deslocamento ainda!</div>
				}
			</div>
        </div>
  );
}
