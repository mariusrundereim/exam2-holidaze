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
      if (owner) queryParams.append("_owner", owner);
      if (bookings) queryParams.append("_bookings", bookings);
      return `/venues/${id}`;
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
