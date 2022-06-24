import Hamburger from '../../assets/Hamburger.svg'

interface SidebarButtonProps {
    isSidebarOpened: boolean;
    openSidebar: (sidebarState: boolean) => void;
  }

export function SidebarButton({ isSidebarOpened, openSidebar }: SidebarButtonProps) {
    return (
        <button 
          onClick={() => openSidebar(!isSidebarOpened)}
          className="mr-11"
        >
            <img src={Hamburger} alt="Botão da Sidebar" />
        </button>
    )
}