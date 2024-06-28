/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRecord, IUser, RecordData, Users, WetherEnum, Wethers } from "./interfaces";

export const isRecordData = (data: any): data is RecordData => {
  if (typeof data !== 'object') return false;
  if (typeof data.dateTime !== 'number') return false;
  if (typeof data.temperature !== 'number') return false;
  if (typeof data.wetherId !== 'string' && data.wetherId !== undefined) return false;
  if (typeof data.userId !== 'string' && data.wetherId !== undefined) return false;
  if (typeof data.comment !== 'string') return false;
  
  return true;
}

export const isRecord = (data: any): data is IRecord => {
  return isRecordData(data) && 'id' in data;
}

export const isRecords = (data: any): data is IRecord[] => {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true;
  return data.every(record => isRecord(record))
}

export const isUser = (data: any): data is IUser => {
  if (typeof data !== 'object') return false;
  if (typeof data.id !== 'string') return false;
  if (typeof data.firstName !== 'string') return false;
  if (typeof data.lastName !== 'string') return false;

  return true;
}

export const isUsers = (data: any): data is Users => {
  if (typeof data !== 'object') return false;
  return Object.values(data).every(user => isUser(user));
}

export const isWether = (data: any): data is WetherEnum => {
  return Object.values(WetherEnum).includes(data);
}

export const isWethers = (data: any): data is Wethers => {
  if (typeof data !== 'object') return false;
  if (data === null) return false;

  return Object.values(data).every(wether => isWether(wether));
}

export const isString = (data: unknown): data is string => {
  return typeof data === 'string';
} 