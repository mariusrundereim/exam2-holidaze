import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config/env";
import { venuesEndpoints } from "./endpoints/venuesEndpoints";
export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }

    if (apiKey) {
      headers.set("X-Noroff-API-Key", apiKey);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    ...venuesEndpoints(builder),
  }),
});

export const { useGetVenuesQuery, useGetVenueByIdQuery } = apiSlice;
