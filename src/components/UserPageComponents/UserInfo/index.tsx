import { CustomInput } from "../../FormComponents/CustomInput";

interface UserProps {
    name: string;
    social_name?: string;
    cpf: string;
    email: string;
    phone: string;
    role: string;
    profile_img?: string;
    deficiency?: string;
    course_sector: string;
    affiliation: string;
}



export function UserInfo({ 
    name,
    social_name,
    cpf,
    email,
    phone,
    role,
    profile_img,
    course_sector,
    deficiency,
    affiliation,
 }: UserProps) {
    return (
        <>
            <div className="w-[105px] flex flex-col items-center">
                <p className="text-black font-normal text-sm leading-6 mb-2">Foto de perfil</p>
                { profile_img != null 
                    ? <img className="w-[105px] h-[105px] rounded-full"  src={profile_img} alt="Imagem de perfil" placeholder=""/>
                    : <div className="flex items-center justify-center overflow-hidden w-[105px] h-[105px] bg-gray-100 rounded-full dark:bg-gray-600">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                      </div>
                }
            </div>

            <div className="w-full ml-16">
                <div className="grid grid-cols-2 gap-x-14 gap-y-3 mb-3">
                    <CustomInput label="Nome" disabled value={name} id="name" />
                    <CustomInput label="Nome Social" disabled value={social_name} id="social_name" />
                </div>

                <div className="grid grid-cols-3 gap-x-28 gap-y-3">
                    <CustomInput label="CPF" disabled value={cpf} id="cpf" />
                    <CustomInput label="Email" disabled value={email} id="email" />
                    <CustomInput label="Telefone" disabled value={phone} id="phone" />
                    
                    <CustomInput label="Vínculo" disabled value={affiliation} id="affiliation" />
                    <CustomInput label="Curso/Setor" disabled value={course_sector} id="course_sector" />

                    { (deficiency == "" || deficiency == undefined) 
                        ? <CustomInput label="Mobilidade de PcD" disabled value={deficiency} id="experience-in-mobility" /> 
                        : <CustomInput label="Tipo de deficiência" disabled value={deficiency} id="deficiency" />
                    }
                    
                </div>
            </div>
            
        </>
    )
}