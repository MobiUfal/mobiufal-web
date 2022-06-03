import { SectionPage } from "./SectionPage";

import HomeLogo from '../../assets/Home.svg'
import Profile from '../../assets/Profile.svg'
import { SubsectionPage } from "./SubsectionPage";

interface SidebarProps {
  isSidebarOpened: boolean;
}

export function Sidebar({ isSidebarOpened }: SidebarProps) {
  return (
    <aside 
      className={`overflow-hidden z-1 py-[calc(2.25rem+12px)] translate-y-[-12px] h-[calc(100vh-6rem+12px)] flex flex-col bg-[#373737] rounded-br-xl ease-in-out duration-300 ${isSidebarOpened ? "w-[260px]" : "w-0"}`}
    >
      <nav className="flex flex-col gap-y-3.5">
        <SectionPage 
          sectionName='Página Inicial'
          iconLink={HomeLogo}
          sectionLink='/deslocamentos'
        />

        <SectionPage 
          sectionName='Gerenciar Usuários'
          iconLink={Profile}
          sectionLink='/users'
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