import { useParams } from "react-router-dom"


// TODO GET USER INFO
type UserInfo = {
    name: string;
    socialName: string;
    cpf: string;
    email: string;
    cellphone: string;
    profileImg: string;

}

// <UserInfo />


export function User() {
    const { id } = useParams();
    const name = 'Amanda';
    const role = 'Voluntário';
    const blocked = 'Bloqueado';

    return (
        <>
            <div className="h-full w-full">
                <div className="max-w-[1068px] mx-auto my-12 rounded-xl bg-[#FFFCF9] border-solid border-2 border-[#000000]-600 pt-5 pb-8 px-10">
                    <div className="w-full flex justify-between items-center">
                        <h1 className="text-3xl font-medium leading-9 text-black">Informações de {name}</h1>
                        <h1 className="text-2xl font-normal leading-7 text-black">{role} ({blocked})</h1>
                    </div>

                    
                
                    <div className="flex w-full justify-end">
                        <button className="w-80 bg-[#29AAD7] rounded-[100px] text-center py-2">Desbloquear Usuário</button>
                    </div>
                </div>
            </div>
        </>
    )
}