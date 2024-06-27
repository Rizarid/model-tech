export enum WetherEnum {
  RAIN = 'Дождь',
  CLOUDY = 'Облочно',
  FOG = 'Туман',
  SUNNY = 'Солнечно'
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

export type Wethers = Record<string, WetherEnum>
export type Users = Record<string, IUser>

export interface IRecord {
  id: string;
  dateTime: number;
  temperature: number;
  wetherId: string;
  userId: string
  comment: string;
}

export type RecordData = Omit<IRecord, 'id'>