/* eslint-disable @typescript-eslint/no-explicit-any */
import { RecordData } from "./interfaces";

export const isRecordData = (data: any): data is RecordData => {
  if (typeof data !== 'object') return false;
  if (typeof data.dateTime !== 'number') return false;
  if (typeof data.temperature !== 'number') return false;
  if (typeof data.wetherId !== 'string') return false;
  if (typeof data.userId !== 'string') return false;
  
  return true;
}

export const isString = (data: unknown): data is string => {
  return typeof data === 'string';
} 