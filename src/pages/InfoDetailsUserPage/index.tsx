import { HiUserCircle } from 'react-icons/hi'






export const InfoDetailsUserPage = () => {
  return (
    <>
        <div className='container mx-auto md:container md:mx-auto p-[50px]'>
          <div className='px-[80px] min-h-[788px] h-full rounded-[15px] bg-[#000000] bg-opacity-10'>
            <div className="flex justify-between ">
              <h1 className='text-black mt-[31px] lg:text-[30px] sm:text-[28px] font-medium'>Informações de Amanda</h1>
              <h1 className='text-black mt-[31px] lg:text-[24px] sm:text-[22px] font-normal'>Voluntário (Aguardando aprovação)</h1>
            </div>

            <div className="flex mt-6 text-black">
              <div className="mr-[105px]">
                <HiUserCircle size={105}/>
              </div>
              <div className="w-full">
                <div className="flex">
                  <section className="flex flex-col mr-[56px] w-full">
                    <label htmlFor="name" className="font-bold">Nome</label>
                    <span id="name">Amanda da Silva Pereira</span>
                  </section>

                  <section className="flex flex-col w-full">
                    <label htmlFor="social-name" className="font-bold">Nome Social</label>
                    <span id="social-name">Amanda da Silva Pereira</span>
                  </section>

                  <section className="flex flex-col w-full"></section>
                </div>
                <div className="flex mt-[10px]">
                  <section className="flex flex-col mr-[56px] w-full">
                    <label htmlFor="cpf" className="font-bold">CPF</label>
                    <span id="cpf">123.456.789-00</span>
                  </section>

                  <section className="flex flex-col w-full">
                    <label htmlFor="email" className="font-bold">Email</label>
                    <span id="email">email@email.com</span>
                  </section>

                  <section className="flex flex-col w-full">
                    <label htmlFor="phone-number" className="font-bold">Telefone</label>
                    <span id="phone-number">(82) 99999-9999</span>
                  </section>
                </div>
                <div className="flex mt-[10px]">
                  <section className="flex flex-col mr-[56px] w-full">
                    <label htmlFor="vinculo" className="font-bold">Vínculo</label>
                    <span id="vinculo">Estudante</span>
                  </section>

                  <section className="flex flex-col w-full">
                    <label htmlFor="course" className="font-bold">Curso/setor</label>
                    <span id="course">email@email.com</span>
                  </section>

                  <section className="flex flex-col w-full">
                    <label htmlFor="experience" className="font-bold">Possui experiência em mobilidade de PcD?</label>
                    <span id="experience">Sim</span>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}