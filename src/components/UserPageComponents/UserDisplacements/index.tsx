import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../../services/api";
import { formatDate } from "../../../utils/formatDate";
import { getLocomotionStatusValueByKey } from "../../../utils/LocomotionStatus";
import { CustomDatePickerRange } from "../../FormComponents/CustomDatePickerRange";
import { DropdownInput } from "../../FormComponents/DropdownInput";
import { FilterButton } from "../../FormComponents/FilterButton";

type Displacement = {
  id: number;
  time: string;
  accepted_at: string;
  finished_at: string;
  source: string;
  destination: string;
  requesterName: string;
  status: string;
};

interface UserDisplacementsProps {
  userId: string | undefined;
  name: string;
}

export function UserDisplacements({ userId, name }: UserDisplacementsProps) {
  const [userDisplacements, setUserDisplacements] = useState<Displacement[]>([] as Displacement[]);
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [originFilter, setOriginFilter] = useState<string>('');
  const [origins, setOrigins] = useState<String[]>([]);
  const [destinations, setDestinations] = useState<String[]>([]);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  async function loadData(url: string) {
    const response = await api.get(url);
    const { data } = response;
    const requestedDisplacements = data.data.requested;

    const originsAux = new Set<String>();
    const destinationsAux = new Set<String>();
    originsAux.add("Todos");
    destinationsAux.add("Todos");
    const displacements = requestedDisplacements.map((displacement: any) => {
      originsAux.add(displacement.origin);
      destinationsAux.add(displacement.destination);
      return {
        id: displacement.id,
        time: formatDate(displacement.time),
        source: displacement.origin,
        destination: displacement.destination,
        requesterName: displacement.requester.name,
        status: getLocomotionStatusValueByKey(displacement.status),
        accepted_at: formatDate(displacement.accepted_at).split(' ').splice(1).toString(),
        finished_at: formatDate(displacement.finished_at).split(' ').splice(1).toString(),
      };
    });
    setUserDisplacements(displacements);
    if (!url.includes("?")) {
      setOrigins(Array.from(originsAux));
      setDestinations(Array.from(destinationsAux));
    }
  }

  useEffect(() => {
    loadData(`/locomotion/user/${userId}`);
  }, []);

  const filterData = useCallback(() => {
    async function loadDisplacementsFiltered(originFilter: string,destinationFilter: string,startDate: Date | null,endDate: Date | null) {
      let url = `/locomotion/user/${userId}`;
      let addOrFirst;
      if (originFilter && originFilter !== 'Todos') {
        url += `?origin=${originFilter.toLowerCase()}`;
      }
      if (destinationFilter && destinationFilter !== 'Todos') {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}destination=${destinationFilter.toLowerCase()}`;
      }
      if (startDate) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}start=${startDate}`;
      }
      if (endDate) {
        addOrFirst = url.includes('?') ? '&' : '?';
        url += `${addOrFirst}end=${endDate}`;
      }
      loadData(url);
    }
    loadDisplacementsFiltered(
      originFilter,
      destinationFilter,
      startDate,
      endDate
    );
  }, [originFilter, destinationFilter, startDate, endDate]);

  return (
    <div className="flex flex-col gap-6 w-10/12">
      <h1 className="text-3xl font-medium leading-9 text-black">
        Deslocamentos de {name}
      </h1>

      <div className="flex">
        <div className="flex w-full">
          <CustomDatePickerRange
            onChangeDate={setDateRange}
            startDate={startDate}
            endDate={endDate}
          />
          <DropdownInput
            placeholder="Origem"
            data={origins}
            value={originFilter}
            onChangeValue={setOriginFilter}
          />
          <DropdownInput
            placeholder="Destino"
            data={destinations}
            value={destinationFilter}
            onChangeValue={setDestinationFilter}
          />
        </div>
        <div className="ml-[37px] flex justify-center w-3/12 align-center">
          <FilterButton onClickValue={filterData} />
        </div>
      </div>

      <div>
        <DataTable
          size='small'
          value={userDisplacements}
          removableSort
          showGridlines
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25, 50]}
          tableStyle={{ minWidth: "60rem" }}
          emptyMessage="Não possui nenhum deslocamento ainda!"
        >
          <Column field="id" header="Id" sortable></Column>
          <Column field="time" header="Horário" sortable></Column>
          <Column field="source" header="Origem" sortable></Column>
          <Column field="destination" header="Destino" sortable></Column>
          <Column field="requesterName" header="Solicitante" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
          <Column field="accepted_at" header="Aceito" sortable></Column>
          <Column field="finished_at" header="Finalizado" sortable></Column>
        </DataTable>
      </div>
    </div>
  );
}
