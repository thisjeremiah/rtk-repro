import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stableResponse = [100];

export const bApi = createApi({
  reducerPath: "bApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["B"],
  endpoints: (build) => ({
    getB: build.query({
      query: () => "https://jsonplaceholder.typicode.com/todos/1",
      providesTags: ["B"],
      transformResponse() {
        return stableResponse;
      },
    }),
  }),
});

export const { useGetBQuery } = bApi;
