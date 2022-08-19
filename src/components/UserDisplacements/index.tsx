import { useEffect, useState } from "react";
import { api } from "../../services/api";

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

    useEffect(() => {
        async function loadData() {
            const response = await api.get(`/locomotion/user/${userId}`);
            const { data } = response 
            const requestedDisplacements = data.data.requested;
            console.log(requestedDisplacements)

            const displacements = requestedDisplacements.map(displacement => {
                return {
                    id: displacement.id,
                    time: displacement.time,
                    source: displacement.origin,
                    destination: displacement.destination,
                    requesterName: displacement.requester.name,
                    status: displacement.status,
                }
            })

            setUserDisplacements(displacements);
        }

        loadData();
    }, [])

    return (
        <div className="flex flex-col gap-6 mt-8 mb-36">
            <h1 className="text-3xl font-medium leading-9 text-black">Deslocamentos de {name}</h1>

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