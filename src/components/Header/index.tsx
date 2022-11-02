import { Logo } from "./Logo";
import { Logout } from "./Logout";
import { SidebarButton } from "./SidebarButton";

interface HeaderProps {
  isSidebarOpened: boolean;
  openSidebar: (sidebarState: boolean) => void;
}

export function Header({ isSidebarOpened, openSidebar }: HeaderProps) {
  return (
    <>
      <header className="z-10 relative flex w-full h-[65px] pr-9 pl-7 items-center justify-between bg-[#29AAD7] rounded-b-xl">
        <div className="flex items-center">
          <SidebarButton
            isSidebarOpened={isSidebarOpened}
            openSidebar={openSidebar}
          />
          <Logo />
        </div>

        <Logout />
      </header>
    </>
  );
}
