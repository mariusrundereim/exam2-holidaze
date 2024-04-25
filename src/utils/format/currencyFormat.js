export default function formatCurrency(amount) {
  let formattedAmount = parseFloat(amount.toFixed(2));
  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency: "NOK",
    currencyDisplay: "symbol",
  })
    .format(formattedAmount)
    .replace("NOK", "kr");
}
