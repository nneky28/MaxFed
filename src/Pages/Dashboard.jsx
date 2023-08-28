import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import Search from "../Components/Header/Search";
import Bg from "../Components/Header/Bg";
import Activities from "../Components/ActivityCard/Activities";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../Utils/Apis";

function Dashboard() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnsearchSearch = (field) => {
    const [lat, lon] = field.value.split(" ");
    setLoading(true);

    Promise.all([
      fetch(
        `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      ),
    ])
      .then(async (responses) => {
        const [weatherResponse, forecastResponse] = await Promise.all(
          responses.map((response) => response.json())
        );
        setCurrentWeather({ city: field.label, ...weatherResponse });
        setForecast({ city: field.label, ...forecastResponse });
      })
      .catch(console.log)
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    if (currentWeather || forecast) return;
    if (currentWeather || forecast) {
      handleOnsearchSearch(field);
    }
  }, [currentWeather, forecast]);

  return (
    <Box
      maxWidth={"100%"}
      alignSelf={"center"}
      borderWidth="1px"
      borderRadius="lg"
      px={5}
      py={5}
      overflow="hidden"
      x
      boxShadow="lg"
      border
      bg="#E1E1E1"
    >
      <Search onSearchChange={handleOnsearchSearch} />
      <Bg data={currentWeather} loading={loading} />
      {forecast && <Activities data={forecast} singleData={currentWeather} />}
    </Box>
  );
}

export default Dashboard;
