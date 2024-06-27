import { http, HttpResponse } from 'msw';
import { records, users, wethers } from './data';
import { isRecordData, isString } from '../shared/typeguards';
import { API_URL } from '../shared/constants';

const getUsers = http.get(`${API_URL}/users`, () => {
  return HttpResponse.json(users)
});

const getWether = http.get(`${API_URL}/wether`, () => {
  return HttpResponse.json(wethers)
});

const getRecords = http.get(`${API_URL}/records`, () => {
  return HttpResponse.json(records)
});

const addRecord = http.post(`${API_URL}/records`, async ({ request }) => {
  const record = await request.json();

  if (isRecordData(record)) {
    const id = Date.now().toString();
    const newRecord = {id, ...record};
    records.push(newRecord)
    return HttpResponse.json(newRecord);
  }

  return HttpResponse.json({
    message: 'record data isn\'t correct'
  })
})

const deleteRecord = http.delete(`${API_URL}/records`, async ({ request }) => {
  const recordId = await request.json();

  if (isString(recordId)) {
    const recordIndex = records.findIndex(record => record.id === recordId);

    if (recordIndex !== -1) {
      const deletedRecords = records.splice(recordIndex, 1)
      return HttpResponse.json(deletedRecords);
    }
    
  }

  return HttpResponse.json({
    message: 'recordId isn\'t correct'
  })
})
 
export const handlers = [getUsers, getWether, getRecords, addRecord, deleteRecord];