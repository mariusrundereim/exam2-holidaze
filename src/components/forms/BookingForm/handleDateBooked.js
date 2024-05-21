import {
  isWithinInterval,
  isBefore,
  endOfDay,
  isValid,
  isAfter,
} from "date-fns";
export const handleDateBooked = (date, bookedDates) => {
  const today = endOfDay(new Date());
  return (
    isBefore(date, today) ||
    bookedDates.some(({ dateFrom, dateTo }) => {
      if (!isValid(dateFrom) || !isValid(dateTo)) {
        console.error("Invalid dateFrom or dateTo");
        return false;
      }
      let start = dateFrom;
      let end = dateTo;
      if (isAfter(dateFrom, dateTo)) {
        console.warn("dateFrom is after dateTo, swapping dates");
        start = dateTo;
        end = dateFrom;
      }
      return isWithinInterval(date, { start, end });
    })
  );
};
