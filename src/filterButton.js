import React from "react";
import { Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const FilterButton = ({ text, ...props }) => {
  return (
      <Button
          padding="5px 25px"
          colorScheme="teal"
          borderRadius="0 6px 6px 0"
      rightIcon={<ChevronDownIcon />}
      variant="solid"
      {...props}
    >
      {text}
    </Button>
  );
};

export default FilterButton;
