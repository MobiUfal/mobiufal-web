import { BsHouseDoorFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { SectionPage } from "./SectionPage";

interface SidebarProps {
  isSidebarOpened: boolean;
}

export function Sidebar({ isSidebarOpened }: SidebarProps) {
  return (
    <aside
      className={`fixed  overflow-hidden top-16  z-[1] pt-[13px] translate-y-[-12px] h-full flex flex-col bg-[#373737] rounded-br-xl ease-in-out duration-300 ${
        isSidebarOpened ? "w-[260px]" : "w-0"
      }`}
    >
      <nav className="flex flex-col gap-y-3.5">
        <SectionPage
          sectionName="Página Inicial"
          Icon={BsHouseDoorFill}
          sectionLink="/deslocamentos"
        />

        <SectionPage
          sectionName="Gerenciar Usuários"
          Icon={FaUserCircle}
          sectionLink="/usuarios"
        />
      </nav>
    </aside>
  );
}
