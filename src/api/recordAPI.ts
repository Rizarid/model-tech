import { API_URL } from "../shared/constants"
import { IRecord, RecordData } from "../shared/interfaces";
import { isRecord, isRecords } from "../shared/typeguards";

const RECORDS_URL = `${API_URL}/records`

export const getRecords = async (): Promise<IRecord[] | undefined> => {
  try {
    const response = await fetch(`${RECORDS_URL}`);
    const records = await response.json();
    if (!isRecords(records)) {
      throw new Error('The received records are not correct');
    }

    return records
  } catch(e) {
    console.error(e)
  }
}

export const addRecord = async (recordData: RecordData): Promise<IRecord | undefined> => {
  try {
    const response = await fetch(`${RECORDS_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(recordData)
    });

    const newRecord = await response.json();

    if (!isRecord(newRecord)) {
      throw new Error('The received added record is not correct');
    }

    return newRecord;
  } catch(e) {
    console.error(e);
  } 
}

export const deleteRecord = async (recordId: string): Promise<IRecord | undefined> => {
  try {
    const response = await fetch(`${RECORDS_URL}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: recordId
    });

    const deletedRecord = await response.json();

    if (!isRecord(deletedRecord)) {
      throw new Error('The received deleted record is not correct');
    }

    return deletedRecord;
  } catch(e) {
    console.error(e);
  }
}