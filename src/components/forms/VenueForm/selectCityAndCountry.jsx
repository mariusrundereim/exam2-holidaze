import { useEffect, useState } from "react";
import { allCityAndCountry } from "../../../utils/venue/allCityAndCountry";
import { NativeSelect, Input, Stack, Title, Text } from "@mantine/core";
import { Controller } from "react-hook-form";
export default function SelectCityAndCountry({ control, setValue }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const cities = Object.values(allCityAndCountry)
    .flat()
    .map((city) => ({
      label: city,
      value: city,
    }));

  useEffect(() => {
    if (selectedCity) {
      const country = Object.keys(allCityAndCountry).find((country) =>
        allCityAndCountry[country].includes(selectedCity)
      );
      setSelectedCountry(country || "");
      setValue("location.country", country || "");
    }
  }, [selectedCity, setValue]);

  const handleCityChange = (event) => {
    setSelectedCity(event.currentTarget.value);
    setValue("location.city", event.currentTarget.value);
  };

  return (
    <>
      <Stack>
        <Controller
          name="location.city"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <NativeSelect
              {...field}
              data={cities}
              value={selectedCity}
              onChange={handleCityChange}
              label="City"
              placeholder="Select a city"
            />
          )}
        />
        <Controller
          name="location.country"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <NativeSelect
              {...field}
              data={[
                { label: "Norway", value: "Norway" },
                { label: "Sweden", value: "Sweden" },
                { label: "Denmark", value: "Denmark" },
                { label: "Finland", value: "Finland" },
              ]}
              value={selectedCountry}
              label="Country"
              placeholder="Country"
              disabled
            />
          )}
        />
        <Controller
          name="location.zip"
          control={control}
          rules={{ required: false }}
          render={({ field }) => (
            <Input.Wrapper label="Zip">
              <Input {...field} placeholder="Zip" />
            </Input.Wrapper>
          )}
        />
      </Stack>
    </>
  );
}
