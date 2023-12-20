import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const stableResponse = [8];

export const aApi = createApi({
  reducerPath: "aApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: ["A"],
  endpoints: (build) => ({
    getA: build.query({
      query: () => "https://jsonplaceholder.typicode.com/todos/1",
      providesTags: ["A"],
      transformResponse() {
        return stableResponse;
      },
    }),
  }),
});

export const { useGetAQuery } = aApi;
