import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../shared/constants";
import { Users } from "../shared/interfaces";
import { isUsers } from "../shared/typeguards";

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getRecords: builder.query<Users, void>({
      query: () => 'users',
      transformResponse: (response) => {
        return isUsers(response) ? response : {} ;
      },
    }),
  }),
});
