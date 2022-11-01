import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { Spinner } from "../Spinner";

interface PrivateRoutesProps {
  JWT: string | null;
  children: ReactNode;
}

export function PrivateRoute({ JWT, children }: PrivateRoutesProps) {
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = useState(false);

  useEffect(() => {
    if (JWT === null) {
      navigate("/");
    }
  }, [JWT]);

  if (JWT === null) {
    return (
      <div className="w-full h-screen flex justify-center">
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <Header isSidebarOpened={openSidebar} openSidebar={setOpenSidebar} />

        <div className="flex flex-row w-full h-full">
          <Sidebar isSidebarOpened={openSidebar} />
          {children}
        </div>
      </>
    );
  }
}
