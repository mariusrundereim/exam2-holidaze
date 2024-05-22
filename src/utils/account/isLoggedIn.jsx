/**
 * Checks if the user is logged in.
 *
 * @param {Object} state - The state object.
 * @returns {boolean} - Returns true if the user is logged in, false otherwise.
 */
export const isLoggedIn = (state) => {
  return !!state.auth.accessToken;
};
