import React from 'react';

import { AiFillHome } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';

const SideBar: React.FC = () => {
  return (
    <>
      <div className="h-screen flex flex-col w-64 bg-[#373737] border-r">

          <div className="mt-28 h-full" id="sidenavExample">

            <ul>
              {/* <li>
                <a href="/" className="w-full px-6 py-4 flex items-center justify-between active:text-[#29AAD7]" >
                  <AiFillHome size={30} />
                  <span className="text-lg">Pagina inicial</span>
                </a>
              </li> */}

              <li id="sidenavEx2">
                <a className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer" data-mdb-ripple="true" data-mdb-ripple-color="dark" data-bs-toggle="collapse" data-bs-target="#collapseSidenavEx2" aria-expanded="false" aria-controls="collapseSidenavEx2">
                  <FaRegUserCircle size={30} />

                  <span className="text-lg">Gerenciar usuarios</span>

                  <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 ml-auto" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="currentColor" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path>
                  </svg>
                </a>


                <ul className="accordion-collapse collapse" id="collapseSidenavEx2" aria-labelledby="sidenavEx2" data-bs-parent="#sidenavExample">
                  <li>
                    <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">Link 1</a>
                  </li>
                  <li>
                    <a href="#!" className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" data-mdb-ripple="true" data-mdb-ripple-color="dark">Link 2</a>
                  </li>
                </ul>


              </li>
            </ul>
          </div>
      </div>
    </>
  );
}

export default SideBar;