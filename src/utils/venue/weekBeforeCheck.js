import { nationalDays } from "./nationalDays";

export const isWithinTwoWeeksBefore = (country) => {
  const today = new Date();
  const nationalDay = nationalDays[country];
  const twoWeeksBefore = new Date(nationalDay);
  twoWeeksBefore.setDate(nationalDay.getDate() - 14);

  return today >= twoWeeksBefore && today <= nationalDay;
};
