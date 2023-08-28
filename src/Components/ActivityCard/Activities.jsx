import React from "react";
import {
  Box,
  Center,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import {
  AppColors,
  Capitalize,
  describeHumidity,
  getVisibilityDescription,
  getWindDirectionAngle,
} from "../../Utils/Methods";

const WEEK_DAYS = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

const Activities = ({ data, singleData }) => {
  const dayInAWeek = new Date().getDay();

  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  const currentDayIndex = new Date().getDay();
  const currentDayData = data?.list?.[currentDayIndex];

  const timeZone = singleData?.timezone;
  const weatherData = {
    sunrise: singleData?.sys?.sunrise,
  };

  const sunrise = new Date((weatherData.sunrise + timeZone) * 1000);
  const formatOptions = { weekday: "short" };
  const dateFormatted = sunrise.toLocaleString("en-US", formatOptions);

  const title = ["Temperature", "Humidity", "Wind Status", "Visibility"];

  return (
    <Box>
      <Heading mt={8} mb={2}>
        Daily Forecast
      </Heading>
      <Text>
        MaxFed Weather provides pinpoint weather information and 7x24 forecasts
        for users to better plan a day.
      </Text>
      <Center py={10} px={5}>
        <SimpleGrid
          columns={[2, null, 7]}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
          w={{ sm: "100%", lg: "65%" }}
        >
          {data?.list?.slice(0, 7).map((item, idx) => (
            <Box key={idx}>
              <Box
                borderWidth={
                  dateFormatted === forecastDays[idx] ? "2px" : "1px"
                }
                borderRadius="lg"
                py={5}
                overflow="hidden"
                boxShadow="lg"
                borderColor={
                  dateFormatted === forecastDays[idx]
                    ? AppColors.biroBlue
                    : AppColors.grayBorder
                }
                bg="white"
              >
                <Text>{forecastDays[idx]}</Text>
                <Center>
                  <Image
                    boxSize="50px"
                    objectFit="cover"
                    src={`icons/${
                      dateFormatted === forecastDays[idx]
                        ? singleData?.weather[0]?.icon
                        : item?.weather[0].icon
                    }.png`}
                    alt="weather"
                  />
                </Center>
                <Text fontSize={"12px"}>
                  {Math.round(item.main.temp)}°C -{" "}
                  {Math.round(item.main.temp_max)}°C
                </Text>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Center>

      <Heading mt={4}>Today's Highlight</Heading>

      <Center py={10}>
        <SimpleGrid
          columns={[2, null, 4]}
          spacing={2}
          direction="row"
          alignItems="center"
          w={{ sm: "100%", lg: "60%" }}
        >
          {title.map((item, idx) => {
            const sunriseTimestamp = data?.city?.sunrise;
            const sunsetTimestamp = data?.city?.sunset;

            const sunriseTime = new Date(sunriseTimestamp * 1000);
            const sunsetTime = new Date(sunsetTimestamp * 1000);

            const timeDifferenceMinutes =
              (sunsetTime - sunriseTime) / (60 * 1000);
            const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);

            return (
              <Box key={idx}>
                <Box
                  borderWidth={"1px"}
                  borderRadius="lg"
                  py={2}
                  overflow="hidden"
                  boxShadow="lg"
                  borderColor={AppColors.grayBorder}
                  bg={AppColors.white}
                >
                  <Text
                    fontSize={"14px"}
                    px={1}
                    fontWeight={"semibold"}
                    color={AppColors.black1}
                  >
                    {item}
                  </Text>
                  {item === "Temperature" && (
                    <Box>
                      <Heading py={4} fontSize={"16px"}>
                        {Math.round(currentDayData?.main?.temp)}°C
                      </Heading>
                      <Text fontSize={"12px"} color={AppColors.black1}>
                        {Capitalize(currentDayData?.weather[0].description)}
                      </Text>
                    </Box>
                  )}

                  {item === "Humidity" && (
                    <Box>
                      <Heading py={4} fontSize={"16px"}>
                        {currentDayData?.main?.humidity}%
                      </Heading>
                      <Text fontSize={"12px"} color={AppColors.black1}>
                        {describeHumidity(currentDayData?.main?.humidity)}
                      </Text>
                    </Box>
                  )}

                  {item === "Wind Status" && (
                    <Box>
                      <Heading py={4} fontSize={"16px"}>
                        {currentDayData?.wind.speed} m/s
                      </Heading>
                      <Text fontSize={"12px"} color={AppColors.black1}>
                        {getWindDirectionAngle(currentDayData?.wind.deg)}
                      </Text>
                    </Box>
                  )}

                  {item === "Visibility" && (
                    <Box>
                      <Heading py={4} fontSize={"16px"}>
                        {currentDayData?.visibility / 1000} km
                      </Heading>
                      <Text fontSize={"12px"} color={AppColors.black1}>
                        {getVisibilityDescription(currentDayData?.visibility)}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default Activities;
