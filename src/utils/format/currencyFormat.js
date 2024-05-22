/**
 * Formats a given amount as currency in Norwegian Krone (NOK).
 * @param {number} amount - The amount to be formatted as currency.
 * @returns {string} The formatted currency amount.
 */
export default function formatCurrency(amount) {
  let formattedAmount = Math.round(amount);
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  }).format(formattedAmount);
}
