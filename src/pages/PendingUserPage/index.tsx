import { useState, useEffect, useCallback } from "react";

import "react-toastify/dist/ReactToastify.css";

import { api } from "../../services/api";

import { CustomInput } from "../../components/FormComponents/CustomInput";
import { DropdownInput } from "../../components/FormComponents/DropdownInput";
import { FilterButton } from "../../components/FormComponents/FilterButton";
import { BsFillEyeFill } from "react-icons/bs";
import { getUserStatusKeyByValue, getUserStatusValueByKey, UserStatus } from "../../utils/UserStatus";
import { getUserRolesKeyByValue, getUserRolesValueByKey, UserRoles } from "../../utils/UserRoles";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

type UserTransiction = {
  id: number;
  name: string;
  role: string;
  aproved: string;
};

type User = {
  id: number;
  name: string;
  role: string;
  approved: string;
};

export function PendingUserPage() {
  const [statusAux, setStatusAux] = useState<String[]>([]);
  const [roleAux, setRoleAux] = useState<String[]>([]);
  let [statusFilter, setStatusFilter] = useState<string>("");
  let [nameFilter, setNameFilter] = useState<string>("");
  let [typeFilter, setTypeFilter] = useState<string>("");

  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers(url: string) {
    const response = await api.get(url);

    const rawUsers: UserTransiction[] = response.data.data;
    const roleAux = new Set<String>();
    const statusAux = new Set<String>();
    statusAux.add("Todos");
    roleAux.add("Todos");

    const users: User[] = rawUsers.map((user) => {
      statusAux.add(getUserStatusValueByKey(user.aproved));
      roleAux.add(getUserRolesValueByKey(user.role));
      return {
        id: user.id,
        name: user.name,
        role: user.role,
        approved: user.aproved, // update aproved word in backend (change aproved to approved in backend api route return)
      };
    });

    setUsers(users);
    if (url === "/user/") {
      setStatusAux(Array.from(statusAux));
      setRoleAux(Array.from(roleAux));
    }
  }

  useEffect(() => {
    loadUsers("/user/");
  }, []);

  const filterData = useCallback(() => {
    async function loadUserFiltered(
      statusFilter: string,
      nameFilter: string,
      typeFilter: string
    ) {
      let url = "/user";
      let addOrFirst;
      if (statusFilter && statusFilter !== "Todos") {
        url += `?aproved=${getUserStatusKeyByValue(statusFilter)}`;
      }
      if (typeFilter && typeFilter !== "Todos") {
        addOrFirst = url.includes("?") ? "&" : "?";
        url += `${addOrFirst}role=${getUserRolesKeyByValue(typeFilter)}`;
      }
      if(nameFilter) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}name=${nameFilter}`

      }
      console.log(url);
      loadUsers(url);
    }
    loadUserFiltered(statusFilter, nameFilter, typeFilter);
  }, [statusFilter, nameFilter, typeFilter]);

  const getRole = (user: User) => {
    return UserRoles[user.role as keyof typeof UserRoles];
  };
  
  const getStatus = (user: User) => {
    return UserStatus[user.approved as keyof typeof UserStatus];
  };

  const view = (user: User) => {
    return  <a href={`usuarios/${user.id}`}className="flex justify-center"> <BsFillEyeFill size={24} color={"#29AAD7"} /></a>
  };

  return (
    <>
      <div className="h-full w-full">
        <div className="container mx-auto md:container md:mx-auto py-[91px] px-[67px]">
          <div className="h-full border-solid border-2 border-[#000000]-600 rounded-[15px] bg-[#FFFCF9]">
            <div className="ml-[32px] mt-[31px]flex flex-col">
              <h1 className="text-black mt-[31px] lg:text-[48px] sm:text-[28px] ">
                Gerenciar Usuários
              </h1>
            </div>

            <div className="px-[60px] mt-[63px] pb-[180px] overflow-x-auto overflow-y-auto h-full w-full">
              <div className="mb-[49px] flex align-center w-full">
                <div className="mb-[49px] flex align-center justify-center w-full">
                  <div className="flex flex-col w-8/12">
                    <div className="flex">
                      <CustomInput
                        placeholder="Nome"
                        value={nameFilter}
                        onChangeText={setNameFilter}
                      />
                      <DropdownInput
                        placeholder="Tipo"
                        data={roleAux}
                        value={typeFilter}
                        onChangeValue={setTypeFilter}
                      />
                      <DropdownInput
                        placeholder="Status"
                        data={statusAux}
                        value={statusFilter}
                        onChangeValue={setStatusFilter}
                      />
                    </div>
                  </div>

                  <div className="ml-[37px] flex justify-center w-full align-center">
                    <FilterButton onClickValue={filterData} />
                  </div>
                </div>
              </div>
              <DataTable 
               value={users} 
               removableSort 
               showGridlines 
               paginator 
               rows={10} 
               rowsPerPageOptions={[5, 10, 25, 50]} 
               tableStyle={{ minWidth: '60rem' }}  
               emptyMessage="Não possui nenhum usuário ainda!"
               >
                <Column field="id" header="Id" sortable></Column>
                <Column field="name" header="Nome" sortable></Column>
                <Column field="role" header="Tipo" body={getRole} sortable></Column>
                <Column field="approved" header="Status" body={getStatus} sortable></Column>
                <Column header="Visualizar" body={view}></Column>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
