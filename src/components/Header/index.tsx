import React, { useState } from 'react';

import mobiufal from '../../assets/mobiufal-logo-completa.svg'

import { GiHamburgerMenu } from 'react-icons/gi';

import SideBar from '../SideBar';

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <header className="absolute flex flex-col w-screen">
        <nav className="navbar navbar-expand-lg shadow-md py-2 relative flex items-center w-full justify-between bg-[#29AAD7] rounded-b-lg">
          <div className="px-6 w-full flex flex-wrap items-center justify-between">
            <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
              <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                <li className="nav-item mr-4">
                  <button className="hover:text-gray-300 transition duration-150 ease-in-out" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <GiHamburgerMenu size={40}/>
                  </button>
                  
                </li>
                <li className="nav-item">
                  <a href="/">
                    <img 
                      src={mobiufal}
                      alt="Mobiufal Logo" 
                      className="md:h-12 md:h-full md:w-48"
                    />
                  </a>
                </li>
                {/* <li className="nav-item">
                  <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Pricing</a>
                </li>
                <li className="nav-item mb-2 lg:mb-0">
                  <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">About</a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </header>
      {sidebarOpen && (<SideBar /> ) }
    </>
  )
}

export default Header;