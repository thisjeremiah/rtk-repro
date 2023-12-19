import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";

const stableResponse = [100];

export const bApi = createApi({
  reducerPath: "bApi",
  baseQuery: fetchBaseQuery(),
  entityTypes: ["B"],
  endpoints: (build) => ({
    getB: build.query({
      query: () => "https://jsonplaceholder.typicode.com/todos/1",
      provides: ["B"],
      transformResponse() {
        return stableResponse;
      },
    }),
  }),
});

export const { useGetBQuery } = bApi;
