interface SidebarProps {
  isSidebarOpened: boolean;
}

export function Sidebar({ isSidebarOpened }: SidebarProps) {
  return (
    <aside 
        className={`z-[-1] py-[calc(2.25rem+12px)] translate-y-[-12px] h-[calc(100vh-6rem+12px)] flex flex-col w-64 bg-[#373737] rounded-br-xl ease-in-out duration-300 ${!isSidebarOpened ? "translate-x-[-16rem]" : "translate-x-0"}`}
      >
        <h1>oi</h1>
    </aside>
  )
}