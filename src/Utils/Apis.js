
import { useQuery } from 'react-query';
import axios from 'axios';



export const geoApiOptions = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": 'b4057d4edcmsheff28051c1f2a5dp1df2a2jsnc6c223ea556a',
    "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
  },
};
export const GEO_API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo";

export const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5";
export const WEATHER_API_KEY = "c867df407bc59273f75269477148a567";

export const fetchCities = async (inputValue) => {
  try {
    const response = await axios.get(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    );

    const options = response.data.data.map((city) => ({
      value: `${city.latitude} ${city.longitude}`,
      label: `${city.name}, ${city.countryCode}`,
      region: `${city.region}`
    }));
    return options;
  } catch (error) {
    console.error('Error fetching cities:', error);
    return [];
  }
}

export
  function useCitySearch() {
  const { data, isLoading, isError } = useQuery('cities', fetchCities, {
    enabled: false,
  });

  const loadOptions = async (inputValue) => {
    if (inputValue.trim() === '') {
      return {
        options: [],
        hasMore: false,
      };
    }
    // Trigger the query when loading options
    const options = await fetchCities(inputValue);
    return {
      options,
    };
  };

  return {
    loadOptions,
    isLoading,
    isError,
  };
}




