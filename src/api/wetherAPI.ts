import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { API_URL } from "../shared/constants";
import { Wethers } from "../shared/interfaces";
import { isWethers } from "../shared/typeguards";
import { createApi } from "@reduxjs/toolkit/query/react";

export const wetherApi = createApi({
  reducerPath: 'wetherApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getRecords: builder.query<Wethers, void>({
      query: () => 'wether',
      transformResponse: (response) => {
        return isWethers(response) ? response : {} ;
      },
    }),
  }),
});

export const getWethers = async (): Promise<Wethers | undefined> => {
  try {
    const response = await fetch(`${API_URL}/wether`);
    const wethers = await response.json();
    if (!isWethers(wethers)) {
      throw new Error('The received records are not correct');
    }

    return wethers;
  } catch(e) {
    console.error(e)
  }
} 