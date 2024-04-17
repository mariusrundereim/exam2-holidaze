import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config/env";
import { venuesEndpoints } from "./endpoints/venuesEndpoints";
import { profilesEndpoints } from "./endpoints/profilesEndpoints";

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    // const apiKey = localStorage.getItem("apiKey");
    headers.set("Authorization", `Bearer ${accessToken}`);

    headers.set("X-Noroff-API-Key", "189d0a84-4f38-4944-8e5e-60946f5eba57");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  endpoints: (builder) => ({
    ...venuesEndpoints(builder),
    ...profilesEndpoints(builder),
  }),
});

export const {
  useGetVenuesQuery,
  useGetVenueByIdQuery,
  useGetProfilesQuery,
  useGetProfileByIdQuery,
} = apiSlice;
