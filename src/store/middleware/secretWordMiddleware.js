import { createVenue } from "../venues/venueSlice";

const secretWordMiddleware = (store) => (next) => (action) => {
  if (createVenue.fulfilled.match(action)) {
    const { data, requireSecretWord } = action.payload;
    if (requireSecretWord) {
      const { name } = data;
      if (!name.includes("holidaze")) {
        console.log("Venue name must include the secret word!");
        return; // Stop the action if it doesn't include 'holidaze'
      }
      // Remove "holidaze" from the name
      action.payload.data.name = name.replace("holidaze", "").trim();
    }
  }
  return next(action);
};

export default secretWordMiddleware;

// const secretWordMiddleware = (store) => (next) => (action) => {
//   if (createVenue.fulfilled.match(action)) {
//     const { data, requireSecretWord } = action.payload;
//     if (requireSecretWord) {
//       const { name } = data;
//       if (!name.includes("holidaze")) {
//         console.log("Venue name must include the secret word!");
//         return; // Stop the action if it doesn't include 'holidaze'
//       }
//       // Remove "holidaze" from the name
//       data.name = name.replace("holidaze", "").trim();
//       action.payload.data = data; // Ensure the modified data is correctly assigned
//     }
//   }
//   return next(action);
// };

// export default secretWordMiddleware;
