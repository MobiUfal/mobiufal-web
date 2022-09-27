import { CustomInput } from "../../components/FormComponents/CustomInput";

export function Configurations() {
    return (
        <>    
        <div className="h-[full] w-full">
          
          <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">
  
            <div className="h-[577px] mx-auto border-solid border-2 border-[#000000]-600 rounded-[15px] bg-[#FFFCF9]">
              
              <div className="ml-[32px] mt-[31px] mb-[38px] flex flex-col">
                <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Configurações Gerais</h1>
              </div>

              <form className="flex items-end ml-[50px]">
                <div className="flex flex-col mr-[35px]">
                    <label htmlFor="workloadInput" className="text-black text-sm leading-6">Definir carga horária por deslocamento</label>
                   <CustomInput placeholder="X horas (valor numérico)" />
                </div>
                
                <button className="h-[30px] bg-[#29AAD7] px-[32px] py-[7px] rounded-[100px] font-medium text-sm leading-4">
                    Salvar
                </button>
              </form>     
            </div>
          </div>
        </div>
      </>
    )
}