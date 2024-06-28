import { FC, memo, useCallback } from "react";
import { IRecord, WetherEnum } from "../../shared/interfaces";
import { DataTable, DataTableSelectionSingleChangeEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { usersApi } from "../../api/usersAPI";
import { wetherApi } from "../../api/wetherAPI";
import { recordsApi } from "../../api/recordAPI";

interface Props {
  selectedRecord: IRecord | null;
  setSelectedRecord: (record: IRecord | null) => void;
}

export const WetherTable: FC<Props> = memo(({selectedRecord, setSelectedRecord}) => {
  const {data: users, isLoading: isUsersLoading} = usersApi.useGetRecordsQuery();
  const {data: wethers, isLoading: isWetherLoading} = wetherApi.useGetRecordsQuery();
  const {data: records, isLoading: isRecordsLoading} = recordsApi.useGetRecordsQuery();

  const isLoading = isUsersLoading && isWetherLoading && isRecordsLoading;

  const dataTimeBodyTemplate = useCallback((record: IRecord) => {
    const date = new Date(record.dateTime);
    return date.toLocaleString("ru");
  }, [])

  const userBodyTemplate = useCallback((record: IRecord) => {
    if (users === undefined || record?.userId === undefined || isUsersLoading) {
      return ''
    }

    const user = users[record.userId];
    return `${user.firstName} ${user.lastName}`
  }, [isUsersLoading, users]);

  const wetherBodyTemplate = useCallback((record: IRecord) => {
    console.log('Туман' in WetherEnum)
    if (wethers === undefined || record?.wetherId === undefined || isWetherLoading) {
      return ''
    }
    return wethers[record.wetherId];
  }, [isWetherLoading, wethers]);

  const onSelectionChange = useCallback((e: DataTableSelectionSingleChangeEvent<IRecord[]>) => {
    const {value} = e;
    console.log(value.id, selectedRecord?.id)
    if (value.id !== selectedRecord?.id) setSelectedRecord(value);
    else setSelectedRecord(null)
  }, [selectedRecord?.id, setSelectedRecord])

  return (
    <div className="card">
      <DataTable 
        value={records} 
        selectionMode="single" 
        selection={selectedRecord} 
        onSelectionChange={onSelectionChange} 
        dataKey="id" 
        metaKeySelection={true} 
        loading={isLoading}
      >
        <Column field="dataTime" header="Дата и время" body={dataTimeBodyTemplate}></Column>
        <Column field="temperature" header="Температура"></Column>
        <Column field="wetherId" header="Погода" body={wetherBodyTemplate}></Column>
        <Column field="userId" header="Кто заполнил" body={userBodyTemplate}></Column>
        <Column field="comment" header="Коментарий"></Column>
      </DataTable>
    </div>
  )
}) 