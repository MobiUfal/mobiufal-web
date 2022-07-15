import Hamburger from '../../assets/Hamburger.svg'

interface SidebarButtonProps {
    isSidebarOpened: boolean;
    openSidebar: (sidebarState: boolean) => void;
  }

export function SidebarButton({ isSidebarOpened, openSidebar }: SidebarButtonProps) {
    return (
        <button 
          onClick={() => openSidebar(!isSidebarOpened)}
        >
            <img src={Hamburger} alt="Botão da Sidebar" className='h-[24px] w-[35px]'/>
        </button>
    )
}