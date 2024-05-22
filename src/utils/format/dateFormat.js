import { format } from "date-fns";
import { nb } from "date-fns/locale";

export function formattedDateTime(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid Date";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("nb-NO", options).format(date);
}

export function formattedDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return "Invalid Date";

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("nb-NO", options).format(date);
}

// import { format } from "date-fns";
// import { nb } from "date-fns/locale";

// export function formattedDateTime(dateStr) {
//   const dateObj = new Date(dateStr);
//   return format(dateObj, "d. MMMM yyyy, HH:mm", { locale: nb });
// }

// export function formattedDate(dateStr) {
//   const dateObj = new Date(dateStr);
//   return format(dateObj, "d. MMMM yyyy", { locale: nb });
// }
