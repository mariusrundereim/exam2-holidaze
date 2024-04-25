import { format } from "date-fns";
import { no } from "date-fns/locale";

const dateStr = "2024-04-23T10:37:40.798Z";
const dateObj = new Date(dateStr);

const formattedDate = format(dateObj, "d. MMMM yyyy", { locale: no });
const formattedTime = format(dateObj, "h:mm a", { locale: no });

console.log(`Date: ${formattedDate}`);
console.log(`Time: ${formattedTime}`);
