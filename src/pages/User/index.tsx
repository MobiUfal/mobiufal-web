import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";
import { Spinner } from "../../components/Spinner";
import { UserApprovalButtons } from "../../components/UserPageComponents/UserApprovalButtons";
import { UserDisplacements } from "../../components/UserPageComponents/UserDisplacements";
import { UserInfo } from "../../components/UserPageComponents/UserInfo";
import { api } from "../../services/api";

type UserInfo = {
    name: string;
    social_name?: string;
    cpf: string;
    email: string;
    phone: string;
    role: string;
    profile_img?: string;
    course_sector: string;
    approved: string;
    deficiency?: string;
    affiliation: string;
}

const approvedDict = {
    "PENDING": "Aguardando Aprovação",
    "APROVED": "Ativo",
    // TODO -> CHECK BLOCKED 
    "BLOCKED": "Bloqueado",
}

const rolesDict = {
    "VOLUNTARY": "Voluntário",
    "ADMIN": "Administrador",
    // TODO -> REQUESTER
}

export function User() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [user, setUser] = useState<UserInfo>({} as UserInfo);

    // this state is used to update this page when it happens any event that changes user information
    const [updateUser, setUpdateUser] = useState(0); 

    if (id === undefined) {
        toast.error("This user does not exist", {
            position: toast.POSITION.TOP_RIGHT
        });

        navigate("/users"); // redirect to users page
    }

    useEffect(() => {
        async function loadData() {
            try {
                const response = await api.get(`/user/${id}`);
                const { data } = response 
    
                const user = {
                    name: data.data.name,
                    social_name: data.data?.social_name,
                    cpf: data.data.cpf,
                    email: data.data.email,
                    phone: data.data.phone,
                    role: data.data.role,
                    profileImg: data.data?.profile_img,
                    deficiency: data.data?.deficiency,
                    course_sector: data.data?.course_sector,
                    approved: data.data.aproved,
                    affiliation: data.data.affiliation,
                };
    
                setUser(user);
            } catch (err) {
                toast.error("Error while trying to get data from user", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
            
        }

        loadData();
    }, [updateUser])

    return (
        <div className="h-full w-full">

            <div className="relative max-w-[1068px] h-5/6 mx-auto my-12 rounded-xl bg-[#FFFCF9] border-solid border-2 border-[#000000]-600 pt-5 pb-8 px-10">
                { user.name != null
                  ? <>
                        <div className="w-full flex justify-between items-center">
                            <h1 className="text-3xl font-medium leading-9 text-black">Informações de {user.name}</h1>
                            <h1 className="text-2xl font-normal leading-7 text-black">{rolesDict[user.role]} ({approvedDict[user.approved]})</h1>
                        </div>

                        <div className="w-full flex mt-4">
                            <UserInfo 
                                name={user.name}
                                social_name={user.social_name}
                                cpf={user.cpf}
                                email={user.email}
                                phone={user.phone}
                                role={user.role}
                                profile_img={user.profile_img}
                                course_sector={user.course_sector}
                                deficiency={user.deficiency}
                                affiliation={user.affiliation}
                            />
                        </div>
                            
                        { user.approved === "APROVED" &&
                            <div className="w-full flex mt-8">
                                <UserDisplacements 
                                  userId={id}
                                  name={user.name}
                                />
                            </div>
                        }
                        
                        <div className="w-full flex items-end justify-end mt-20">
                            <UserApprovalButtons approved={user.approved} userId={id} updateUser={updateUser} setUpdateUser={setUpdateUser} />
                        </div>
                        
                    </>                    
                    : <Spinner />
                }
            </div>
        </div>
    )
}