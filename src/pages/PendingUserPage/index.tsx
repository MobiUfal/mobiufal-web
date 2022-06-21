import { useState, useEffect, useCallback } from 'react'
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { TiDeleteOutline } from 'react-icons/ti'; 
import { AiOutlineCheckCircle } from 'react-icons/ai'; 
import { HiOutlineDotsCircleHorizontal as HiDotsCircle } from 'react-icons/hi';
import { InfoModal } from '../../components/InfoModal';
import { api } from '../../services/api';
import { formatDate } from '../../utils/formatDate';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { DeleteModal } from '../../components/DeleteModal';

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

interface UserRequester {
  id: number;
  name: string;
  role: string;
  email: string;
  cpf: string;
  phone: string;
  affiliation: string;
  course_sector: string;
}

interface PendingDisplacementsData {
  id: number;
  time: string;
  origin: string;
  origin_details: string;
  destination: string;
  destination_details: string;
  status: number;
  requester: UserRequester;
  voluntary: {
    id: number;
    name: string;
  }
}

type ResponseDto = {
  status: boolean;
  message: string;
  data: PendingDisplacementsData[];
}


export function PendingUserPage() {
  let [isOpen, setIsOpen] = useState(false);
  let [idToCancel, setIdToCancel] = useState<number>();
  let [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [pendingDisplacements, setPendingDisplacements] = useState<PendingDisplacementsData[]>([]);
  const [userDetails, setUserDetails] = useState<UserRequester>({} as UserRequester);

  const handleCancelRequest = useCallback(async (id: (number | undefined)) => {
    try {
      if(id) {
        // await api.post('/locomotion/cancel', {
        //   locomotionId: id
        // });

        // toast.success('Deslocamento cancelado com sucesso.', {
        //   position: toast.POSITION.TOP_RIGHT,
        //   autoClose: 2500
        // });
      }
    } catch (err) {
      toast.error('Não foi possível cancelar o deslocamento, por favor tente novamente.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500
      });
    }
  }, [])

  useEffect(() => {
    async function loadDisplacements() {
      const response = await api.get<ResponseDto>(
        '/locomotion/pending',
      );
      
      const { data } = response.data;
      setPendingDisplacements(
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
      <InfoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} user={userDetails} />
      <DeleteModal isOpen={isDeleteModalOpen} 
        closeModal={() => setDeleteModalOpen(false)} 
        textTitle={"deslocamento"} 
        handleCancel={() => handleCancelRequest(idToCancel)} 
      />
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
                  {pendingDisplacements.length !== 0 && pendingDisplacements.map(displacement => (

                    <tr key={displacement.id} className="border border-black">
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.requester.name}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.requester.role}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{displacement.status}</td>
                      <td className="border border-[#B9B9B9] px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                        <div className='flex justify-center align-center'>
                          <button className='mr-[18px]' onClick={() => {setDeleteModalOpen(!isDeleteModalOpen); setIdToCancel(displacement.id)}}>
                            <TiDeleteOutline size={34.5} color={"#FF0000"} 
                            />
                          </button>
                          <button className='mr-[18px]'>
                            <AiOutlineCheckCircle size={30} color={"#40F600"} />
                          </button>
                          <button onClick={() => {setIsOpen(!isOpen); setUserDetails(displacement.requester);}}>
                            <HiDotsCircle size={31} color={"#1F3E8C"} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}