interface SidebarProps {
  isSidebarOpened: boolean;
}

export function Sidebar({ isSidebarOpened }: SidebarProps) {
  return (
    <aside 
        className={`z-[-1] py-[calc(2.25rem+12px)] translate-y-[-12px] h-[calc(100vh-6rem+12px)] flex flex-col bg-[#373737] rounded-br-xl ease-in-out duration-300 ${isSidebarOpened ? "w-64" : "w-0"}`}
      >
        <h1>Teste</h1>
    </aside>
  )
}