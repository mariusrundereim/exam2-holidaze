export const profilesEndpoints = (builder) => ({
  getProfileById: builder.query({
    query: (name) => `profiles/${name}`,
    transformResponse: (response, meta, arg) => {
      console.log("Meta", meta);
      console.log("arguments", arg);

      if (arg.shouldFormat) {
        return formatProfile(response);
      }
      return response.data;
    },
  }),
});
