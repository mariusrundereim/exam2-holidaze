export const isLoggedIn = (state) => {
  return !!state.auth.accessToken;
};
// export const isLoggedIn = (state) => Boolean(state.auth.accessToken);
