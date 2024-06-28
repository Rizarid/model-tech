import { Button } from "primereact/button";
import { FC, useCallback, useState } from "react";
import { recordsApi } from "../../api/recordAPI";
import { AddRecordModal } from "../AddRecordModal/AddRecordModal";

import styles from './ControlPanel.module.scss';
import { IRecord } from "../../shared/interfaces";

interface Props {
  selectedRecordId: string | null;
  setSelectedRecord: (record: IRecord | null) => void;
}

export const ControlPanel: FC<Props> = ({selectedRecordId, setSelectedRecord}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteRecord] = recordsApi.useDeleteRecordMutation();

  const deleteButtonClick = useCallback(() => {
    if (selectedRecordId !== null) {
      deleteRecord(selectedRecordId);
      setSelectedRecord(null)
    }
  }, [deleteRecord, selectedRecordId, setSelectedRecord])

  const newButtonClick = useCallback(() => {
    setModalIsOpen(true);
  }, [])
  return (
    <>
      <div className={styles.controlPanel}>
          <Button 
            label="Добавить" 
            icon="pi pi-plus" 
            severity="success" 
            onClick={newButtonClick} 
          />
          <Button 
            label="Удалить" 
            icon="pi pi-trash" 
            severity="danger" 
            onClick={deleteButtonClick} 
            disabled={selectedRecordId === null} 

          />
      </div>
      <AddRecordModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </>
  )
}