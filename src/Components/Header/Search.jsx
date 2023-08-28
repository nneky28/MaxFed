import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { useCitySearch } from "../../Utils/Apis";

function Index({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const { loadOptions } = useCitySearch();

  const handleOnchange = (text) => {
    setSearch(text);
    onSearchChange(text);
  };

  return (
    <Flex w={"100%"}>
      <Box>
        <AsyncPaginate
          placeholder="Enter city name... "
          debounceTimeout={600}
          value={search}
          onChange={handleOnchange}
          loadOptions={loadOptions}
        />
      </Box>
    </Flex>
  );
}

export default Index;
