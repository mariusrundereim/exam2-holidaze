// utils/nationalDays.js
export const nationalDays = {
  Norway: new Date(new Date().getFullYear(), 4, 17), // May 17
  Denmark: new Date(new Date().getFullYear(), 5, 5), // June 5
  Sweden: new Date(new Date().getFullYear(), 5, 6), // June 6
  Finland: new Date(new Date().getFullYear(), 11, 6), // December 6
};

export const getNextNationalDay = () => {
  const today = new Date();
  const nationalDayEntries = Object.entries(nationalDays);

  let nextCountry = null;
  let nextDate = null;

  for (const [country, date] of nationalDayEntries) {
    if (date >= today) {
      if (!nextDate || date < nextDate) {
        nextCountry = country;
        nextDate = date;
      }
    }
  }

  // If no upcoming national day is found in the current year, use the earliest in the next year
  if (!nextDate) {
    nextDate = new Date(new Date().getFullYear() + 1, 0, 1);
    nextCountry = Object.keys(nationalDays).reduce(
      (earliestCountry, country) => {
        const date = new Date(nationalDays[country]);
        date.setFullYear(nextDate.getFullYear());
        return !earliestCountry ||
          date < new Date(nationalDays[earliestCountry])
          ? country
          : earliestCountry;
      },
      null
    );
  }

  return { nextCountry, nextDate };
};
