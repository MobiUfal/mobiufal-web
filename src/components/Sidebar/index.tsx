import { BsHouseDoorFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'

import { SectionPage } from "./SectionPage";
import { SubsectionPage } from "./SubsectionPage";

interface SidebarProps {
  isSidebarOpened: boolean;
}

export function Sidebar({ isSidebarOpened }: SidebarProps) {
  return (
    <aside 
      className={`overflow-hidden z-1 py-[calc(2.25rem+12px)] translate-y-[-12px] h-[calc(100vh-6rem+52px)] flex flex-col bg-[#373737] rounded-br-xl ease-in-out duration-300 ${isSidebarOpened ? "w-[260px]" : "w-0"}`}
    >
      <nav className="flex flex-col gap-y-3.5">
        <SectionPage 
          sectionName='Página Inicial'
          Icon={BsHouseDoorFill}
          sectionLink='/displacements'
        />

        <SectionPage 
          sectionName='Gerenciar Usuários'
          Icon={FaUserCircle}
          sectionLink='/users/pending'
        >
          <nav className="flex flex-col gap-y-3.5">
            <SubsectionPage
              subSectionName="Usuários Pendentes"
              subSectionLink="/users/pending"
            />
            <SubsectionPage
              subSectionName="Carga Horária"
              subSectionLink="/users/workload"
            />
          </nav>
        </SectionPage> 
      </nav>
    </aside>
  )
}