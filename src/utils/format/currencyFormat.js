export default function formatCurrency(amount) {
  let formattedAmount = Math.round(amount);
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  }).format(formattedAmount);
}

// export default function formatCurrency(amount) {
//   // Ensure the amount is an integer by rounding it, removing decimal places
//   let formattedAmount = Math.round(amount);

//   // Use Intl.NumberFormat to format the number as currency
//   return new Intl.NumberFormat("nb-NO", {
//     style: "currency",
//     currency: "NOK",
//     currencyDisplay: "code",  // Use 'code' to display the currency code (NOK)
//     minimumFractionDigits: 0,  // This will prevent decimal places from being displayed
//   }).format(formattedAmount);
// }
