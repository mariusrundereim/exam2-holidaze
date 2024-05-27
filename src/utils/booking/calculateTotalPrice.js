export const calculateTotalPrice = (dateFrom, dateTo, pricePerNight) => {
  if (!dateFrom || !dateTo) return { totalPrice: 0, nights: 0 };
  const nights = (dateTo - dateFrom) / (1000 * 60 * 60 * 24);
  const totalPrice = nights * pricePerNight;
  return { totalPrice, nights };
};

// export const calculateTotalPrice = (dateFrom, dateTo, pricePerNight) => {
//   if (!dateFrom || !dateTo) return 0;
//   const nights = (dateTo - dateFrom) / (1000 * 60 * 60 * 24);
//   return nights * pricePerNight;
// };
