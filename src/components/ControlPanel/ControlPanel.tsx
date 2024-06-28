import { Button } from "primereact/button";
import { FC, useCallback, useState } from "react";
import { recordsApi } from "../../api/recordAPI";
import { AddRecordModal } from "../AddRecordModal/AddRecordModal";

import styles from './ControlPanel.module.scss';

interface Props {
  selectedRecordId: string | null;
}

export const ControlPanel: FC<Props> = ({selectedRecordId}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteRecord] = recordsApi.useDeleteRecordMutation();

  const deleteButtonClick = useCallback(() => {
    if (selectedRecordId !== null) {
      deleteRecord(selectedRecordId)
    }
  }, [deleteRecord, selectedRecordId])

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