const profileFilteringMiddleware = (store) => (next) => (action) => {
  console.log("Action dispatched:", action); // Debugging log

  const result = next(action);

  console.log("State after action:", store.getState()); // Debugging log

  return result;
};

export default profileFilteringMiddleware;
