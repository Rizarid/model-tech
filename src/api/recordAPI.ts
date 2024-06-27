import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../shared/constants"
import { IRecord, RecordData } from "../shared/interfaces";
import { isRecords } from "../shared/typeguards";

const RECORDS_TAG_TYPE = 'Records';
const RECORDS_URL = 'records/';

export const recordsApi = createApi({
  reducerPath: 'recordsApi',
  tagTypes: [RECORDS_TAG_TYPE],
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getRecords: builder.query<IRecord[], void>({
      query: () => RECORDS_URL,
      transformResponse: (response) => {
        return isRecords(response) ? response : [] ;
      },
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: `${RECORDS_TAG_TYPE}` as const, id })), RECORDS_TAG_TYPE]
          : [RECORDS_TAG_TYPE]
    }),
    addRecord: builder.mutation<RecordData, Partial<RecordData>>({
      query: (body: RecordData) => ({
        url: RECORDS_URL,
        method: 'POST',
        body
      }),
      invalidatesTags: [RECORDS_TAG_TYPE],
    }),
    deleteRecord: builder.mutation({
      query: (recordId: string) => ({
        url: RECORDS_URL,
        method: 'DELETE',
        body: recordId
      }),
      invalidatesTags: [RECORDS_TAG_TYPE],
    })
  }),
});