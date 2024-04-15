import { baseQuery } from "../apiSlice";
export const venuesEndpoints = (builder) => ({
  // List all venues
  getVenues: builder.query({
    query: (page) => `venues?page=${page ?? 1}`,
    transformResponse: (response) => response.data,
  }),

  // Single venue with ID
  getVenueById: builder.query({
    query: ({ id, owner, bookings }) => {
      const queryParams = new URLSearchParams();
      if (owner !== undefined) queryParams.append("_owner", String(owner));
      if (bookings !== undefined)
        queryParams.append("_bookings", String(bookings));
      return `/venues/${id}?${queryParams}`;
    },
    transformResponse: (response) => response.data,
  }),

  createVenue: builder.mutation({
    query: (newVenue) => ({
      url: "/holidaze/venues",
      method: "POST",
      body: newVenue,
    }),
  }),
});
