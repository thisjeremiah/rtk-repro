import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";

const stableResponse = [8];

export const aApi = createApi({
  reducerPath: "aApi",
  baseQuery: fetchBaseQuery(),
  entityTypes: ["A"],
  endpoints: (build) => ({
    getA: build.query({
      query: () => "https://jsonplaceholder.typicode.com/todos/1",
      provides: ["A"],
      transformResponse() {
        return stableResponse;
      },
    }),
  }),
});

export const { useGetAQuery } = aApi;
