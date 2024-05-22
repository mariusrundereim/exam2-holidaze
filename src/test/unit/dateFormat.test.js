import {
  formattedDateTime,
  formattedDate,
} from "../../utils/format/dateFormat";

describe("formattedDateTime", () => {
  it("should format date and time correctly", () => {
    const dateStr = "2024-04-23T10:37:40.798Z";
    const expected = "23. april 2024 kl. 12:37";
    const result = formattedDateTime(dateStr);
    expect(result).toEqual(expected);
  });

  it("should handle invalid date string", () => {
    const dateStr = "invalid-date";
    const expected = "Invalid Date";
    const result = formattedDateTime(dateStr);
    expect(result).toEqual(expected);
  });
});

describe("formattedDate", () => {
  it("should format date correctly", () => {
    const dateStr = "2024-04-23T10:37:40.798Z";
    const expected = "23. april 2024";
    const result = formattedDate(dateStr);
    expect(result).toEqual(expected);
  });

  it("should handle invalid date string", () => {
    const dateStr = "invalid-date";
    const expected = "Invalid Date";
    const result = formattedDate(dateStr);
    expect(result).toEqual(expected);
  });
});
