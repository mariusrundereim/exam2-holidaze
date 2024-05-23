const profileFilteringMiddleware = (store) => (next) => (action) => {
  if (
    action.type === "profiles/setProfiles" ||
    action.type === "profiles/updateWhitelist"
  ) {
    // Apply any additional logic if needed
  }
  return next(action);
};

export default profileFilteringMiddleware;
