import { Logo } from './Logo';
import { Profile } from './Profile';
import { SidebarButton } from './SidebarButton';

interface HeaderProps {
  isSidebarOpened: boolean;
  openSidebar: (sidebarState: boolean) => void;
}

export function Header({ isSidebarOpened, openSidebar }: HeaderProps) {
  return (
    <>
      <header className="flex w-full h-24 pr-9 pl-7 items-center justify-between bg-[#29AAD7] rounded-b-xl">
        <div className="flex items-center">
          <SidebarButton isSidebarOpened={isSidebarOpened} openSidebar={openSidebar} />
          <Logo />
        </div>

        <Profile />
      </header>
    </>
  )
}