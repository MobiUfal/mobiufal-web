import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { formatDate } from "../../../utils/formatDate";
import { DropdownInput } from "../../FormComponents/DropdownInput";
import { FilterButton } from "../../FormComponents/FilterButton";

type Displacement = {
    id: number,
    time: string;
    source: string;
    destination: string;
    requesterName: string;
    status: string;
}

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

    async function loadData(url: string) {
        const response = await api.get(url);
        const { data } = response 
        const requestedDisplacements = data.data.requested;
      
        const originsAux = new Set<String>();
        const destinationsAux = new Set<String>();
        originsAux.add('TODOS');
        destinationsAux.add('TODOS');
        const displacements = requestedDisplacements.map((displacement:any) => {
          originsAux.add(displacement.origin);
          destinationsAux.add(displacement.destination);
          return {
            id: displacement.id,
            time: formatDate(displacement.time),
            source: displacement.origin,
            destination: displacement.destination,
            requesterName: displacement.requester.name,
            status: displacement.status,
          }
      })
      setUserDisplacements(displacements);
      if(!url.includes("?")) {
        setOrigins(Array.from(originsAux));
        setDestinations(Array.from(destinationsAux));
      }
    }

    useEffect(() => {
        loadData(`/locomotion/user/${userId}`);
    }, [])

    const filterData = useCallback(() => {
      async function loadDisplacementsFiltered(originFilter: string, destinationFilter: string) {
        let url = `/locomotion/user/${userId}`;
        let addOrFirst;
        if(originFilter && originFilter !== 'TODOS') {
          url += `?origin=${originFilter.toLowerCase()}`
        }
        if(destinationFilter  && destinationFilter !== 'TODOS') {
          addOrFirst = url.includes('?') ? '&' : '?';
          url += `${addOrFirst}destination=${destinationFilter.toLowerCase()}`
        }        
        console.log(url)
        loadData(url);
      }
      loadDisplacementsFiltered(originFilter, destinationFilter);
    }, [originFilter, destinationFilter])

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-medium leading-9 text-black">Deslocamentos de {name}</h1>


            <div className='flex w-full'>
              <div className='flex'>
                <DropdownInput placeholder='Origem' data={origins} value={originFilter} onChangeValue={setOriginFilter} />
                <DropdownInput placeholder='Destino' data={destinations} value={destinationFilter} onChangeValue={setDestinationFilter} />
              </div>                  

              <div className='ml-[37px] flex justify-center w-3/12 w-full align-center'>
                <FilterButton onClickValue={filterData}/>
              </div>
            </div>

            <table className='table-auto block min-w-full max-h-80 overflow-y-scroll text-center border-collapse border border-[#B9B9B9] bg-[#fff]'>
                <thead className='bg-[#000000]/5 text-black'>
                  <tr>
                    <th className="border border-[#B9B9B9] px-4 py-2">Horário</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Origem</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Destino</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Solicitante</th>
                    <th className="border border-[#B9B9B9] px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                    {userDisplacements.length !== 0 && (userDisplacements.map(displacement => (
                        <tr key={displacement.id} className="border border-black">
                            <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.time}</td>
                            <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.source}</td>
                            <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.destination}</td>
                            <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.requesterName}</td>
                            <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.status}</td>
                        </tr>
                    )))}                
                </tbody>
              </table>
        </div>
    )
}