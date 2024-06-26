import { IRecord, Users, WetherEnum, Wethers } from "./interfaces"


export const wethers: Wethers = {
  '1': WetherEnum.RAIN,
  '2': WetherEnum.CLOUDY,
  '3': WetherEnum.FOG,
  '4': WetherEnum.SUNNY,
}

export const users: Users = {
  'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d1': {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d1',
    firstName: 'Джон',
    lastName: 'Меверик',
  }, 
  'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d2': {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d2',
    firstName: 'Иван',
    lastName: 'Ботов',
  },
  'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d3': {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d3',
    firstName: 'Кирил',
    lastName: 'Былин',
  },
  'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d4': {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d4',
    firstName: 'Ринат',
    lastName: 'Акбаров',
  },
  'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d5': {
    id: 'c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d5',
    firstName: 'Павел',
    lastName: 'Кирилин',
  },
}

export const records: IRecord[] = []


