import { Dialog } from "primereact/dialog";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { ChangeEvent, FC, FormEvent, useCallback, useMemo, useState } from "react";
import { usersApi } from "../../api/usersAPI";
import { wetherApi } from "../../api/wetherAPI";
import { IUser, RecordData, WetherEnum } from "../../shared/interfaces";
import { recordsApi } from "../../api/recordAPI";
import { Button } from "primereact/button";

import styles from './AddRecordModal.module.scss'

interface Props {
  modalIsOpen: boolean;
  setModalIsOpen: (newValue: boolean) => void;
}

export const AddRecordModal: FC<Props> = ({modalIsOpen, setModalIsOpen}) => {
  const [temperature, setTemperature] = useState(0);
  const [selectedUser, setSelectedUser] = useState<IUser>();
  const [selectedWether, setSelectedWether] = useState<{id: string, wether: WetherEnum}>();
  const [comment, setComment] = useState('');

  const {data: users} = usersApi.useGetRecordsQuery();
  const {data: wethers} = wetherApi.useGetRecordsQuery();
  const [addRecord] = recordsApi.useAddRecordMutation();

  const memoizedWether = useMemo(() => {
    if (!wethers) return []
    return Object.entries(wethers).map(item => ({id: item[0], wether: item[1]}))
  }, [wethers])

  const memoizedUsers = useMemo(() => {
    if (!users) return []
    return Object.values(users).map(user => ({id: user.id, fullName: `${user.firstName} ${user.lastName}`}));
  }, [users])

  const onTemperatureChange = useCallback((e: InputNumberValueChangeEvent) => {
    if (e.value) setTemperature(e.value)
  }, [])

  const onUsersChange = useCallback((e: DropdownChangeEvent) => {
    if (e.value) setSelectedUser(e.value);
  }, [])

  const onWetherChange = useCallback((e: DropdownChangeEvent) => {
    if (e.value) setSelectedWether(e.value);
  }, [])

  const onCommentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) setComment(e.target.value);
  }, [])

  const onHide = useCallback(() => {
    setTemperature(0);
    setSelectedUser(undefined);
    setSelectedWether(undefined);
    setComment('');
    setModalIsOpen(false);
  }, [setModalIsOpen])

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recordData: RecordData = {
      dateTime: Date.now(),
      temperature,
      wetherId: selectedWether?.id,
      userId: selectedUser?.id,
      comment
    }

    addRecord(recordData);
    onHide();
    
  }, [addRecord, comment, onHide, selectedUser?.id, selectedWether?.id, temperature])

  return (
    <Dialog header="Добавить запись" visible={modalIsOpen} onHide={onHide}>
      <form onSubmit={onSubmit} >
        <div className={styles.field}>
          <InputNumber 
            value={temperature} 
            onValueChange={onTemperatureChange} 
            maxFractionDigits={2} 
            min={-50}
            max={60}
            required
            style={{width: '100%'}}
          />
        </div>

        <div className={styles.field}>
          <Dropdown 
            value={selectedWether} 
            onChange={onWetherChange} 
            options={memoizedWether} 
            optionLabel="wether" 
            style={{width: '100%'}}
          />
        </div>

        <div className={styles.field}>
          <Dropdown 
            value={selectedUser} 
            onChange={onUsersChange} 
            options={memoizedUsers} 
            optionLabel="fullName"  
            className="w-full md:w-14rem" 
            style={{width: '100%'}}
          />
        </div>

        <div className={styles.field}>
          <InputTextarea 
            value={comment} 
            onChange={onCommentChange} 
            placeholder="Комментарий" 
            rows={5} 
            cols={30} 
          />
        </div>

        <Button 
          label="Сохранить" 
          style={{
            width: '100%',
            background: 'var(--green-500)'
          }}
        />
      </form>
    </Dialog>
  )
}