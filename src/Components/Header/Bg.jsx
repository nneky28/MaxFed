import React from "react";
import { Box, Flex, Heading, Image, Spacer, Spinner } from "@chakra-ui/react";
import { AppColors } from "../../Utils/Methods";

const Bg = ({ data, loading }) => {
  const timezoneOffsetInSeconds = data?.timezone;
  const weatherData = {
    country: data?.sys?.country,
    sunrise: data?.sys?.sunrise,
    sunset: data?.sys?.sunset,
  };

  const sunrise = new Date(
    (weatherData.sunrise + timezoneOffsetInSeconds) * 1000
  );

  const currentTimeInUTC = new Date();
  const timezoneOffsetMinutes = data?.timezone / 60 - 60;
  const offsetTimeInLocal = new Date(
    currentTimeInUTC.getTime() + timezoneOffsetMinutes * 60 * 1000
  );
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
  };

  const time12hr = offsetTimeInLocal.toLocaleString("en-US", timeOptions);

  const formatOptions = { day: "numeric", month: "long", weekday: "long" };
  const sunriseDateFormatted = sunrise.toLocaleString("en-US", formatOptions);

  const basicBoxStyles = {
    mt: { sm: "10%", lg: "2%" },
    position: "relative",
    width: "100%",
    h: "60vh",
    overflow: "hidden",
    borderRadius: "lg",
  };

  return (
    <Box sx={basicBoxStyles}>
      <Box position="relative" width="100%" height="100%">
        <Box position="absolute" top={0} left={0} width="100%" height="100%" />

        <Box
          backgroundImage={`url('https://images.unsplash.com/photo-1591536813111-b6dccb6f67e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpcnBsYW5lJTIwd2luZG93fGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60')`}
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          width="100%"
          height="100%"
          py={6}
        >
          {loading ? (
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
            >
              <Spinner
                size="lg"
                thickness="4px"
                speed="0.65s"
                emptyColor={AppColors.white}
                color={AppColors.biroBlue}
              />
            </Box>
          ) : !data ? null : (
            <Flex
              flexDirection={{ base: "column", lg: "row" }}
              justifyContent={{ base: "center", lg: "flex-start" }}
              height="50%"
              px={5}
              py={5}
            >
              <Box mb={{ base: 4, lg: 0 }} mr={{ base: 0, lg: 4 }}>
                <Heading
                  fontSize={{
                    sm: "14px",
                    lg: "26px",
                  }}
                  color={AppColors.white}
                >
                  {data?.city}
                </Heading>

                <Heading
                  fontSize={{
                    sm: "14px",
                    lg: "26px",
                  }}
                  color={AppColors.white}
                >
                  {Math.round(data?.main?.temp)}°C
                </Heading>
              </Box>
              <Spacer />
              <Box>
                <Heading
                  fontSize={{
                    sm: "14px",
                    lg: "26px",
                  }}
                  color={AppColors.white}
                >
                  {sunriseDateFormatted}
                </Heading>

                <Heading
                  fontSize={{
                    sm: "14px",
                    lg: "26px",
                  }}
                  color={AppColors.white}
                >
                  {time12hr}
                </Heading>
              </Box>
            </Flex>
          )}
          {loading ? null : !data ? null : (
            <Box
              height="50%"
              display={"flex"}
              justifyContent={"right"}
              px={5}
              alignItems="flex-end"
            >
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                border
                bg="white"
                borderColor={AppColors.grayBorder}
              >
                <Image
                  alt="weather"
                  src={`icons/${data?.weather[0]?.icon}.png`}
                  boxSize={"60px"}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Bg;
