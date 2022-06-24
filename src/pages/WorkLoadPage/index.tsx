import { Breadcrumbs } from '../../components/Breadcrumbs';

const paths = [
  {
    pathName: 'Gerenciar Usuários',
    link: '/users/workload'
  },
  {
    pathName: 'Carga horária',
    link: '/users/workload'
  }
];

export function WorkLoadPage() {
  return (
    <>    
      <div className="h-full w-full">
        <div className="container mx-auto md:container md:mx-auto mt-[22px] px-[67px]">

          <Breadcrumbs paths={paths}/>
        </div>
        <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">

          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px]">
            
            <div className="ml-[32px] mt-[31px]flex flex-col pb-[385px]">
              <h1 className='text-black mt-[31px] lg:text-[48px] sm:text-[28px] '>Carga Horária</h1>
              
              <span className='text-[#000000]/60 mt-[12px]'>4 usuários necessitam de sua atenção</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}