import { format } from "date-fns";
import { nb } from "date-fns/locale";

export function formattedDateTime(dateStr) {
  const dateObj = new Date(dateStr);
  return format(dateObj, "d. MMMM yyyy, HH:mm", { locale: nb });
}

// const dateStr = "2024-04-23T10:37:40.798Z";
// const dateObj = new Date(dateStr);

// export const formattedDate = format(dateObj, "d. MMMM yyyy", { locale: no });
// export const formattedTime = format(dateObj, "h:mm a", { locale: no });
// export const formattedDateTime = format(dateObj, "d. MMMM yyyy, h:mm a", {
//   locale: nb,
// });
