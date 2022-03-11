import React, { FC, ChangeEvent, useEffect, useState } from "react";
import {
  Grid,
  Center,
  Select,
  ButtonProps,
  Text,
  Button,
  ChakraProvider
} from "@chakra-ui/react";
import {
  Paginator,
  Container,
  Previous,
  usePaginator,
  Next,
  PageGroup
} from "chakra-paginator";

const fetchPokemons = (pageSize: number, offset: number) => {
  return fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  ).then((res) => res.json());
};

const Demo: FC = () => {
  // react hooks
  const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
    undefined
  );
    const [pokemons, setPokemons] = useState<any[]>([]);
    
    console.log('pokemonsTotal',pokemonsTotal)

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    pageSize,
    setPageSize,
    offset // you may not need this most of the times, but it's returned for you anyway
  } = usePaginator({
    total: pokemonsTotal,
    initialState: {
      pageSize: 10,
      currentPage: 1,
      isDisabled: false
    }
  });

    console.log("Demo pageSize", pageSize)
  // effects
  useEffect(() => {
    fetchPokemons(pageSize, offset).then((pokemons) => {
      setPokemonsTotal(pokemons.count);
      setPokemons(pokemons.results);
      console.log('demp PokemonsTotal', pokemonsTotal)
      console.log('demp Pokemons',pokemons)
        
    });
  }, [currentPage, pageSize, offset]);

  // styles
  const baseStyles: ButtonProps = {
    w: 7,
    fontSize: "sm"
  };

  const normalStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "green.300"
    },
    bg: "red.300"
  };

  const activeStyles: ButtonProps = {
    ...baseStyles,
    _hover: {
      bg: "blue.300"
    },
    bg: "green.300"
  };

  const separatorStyles: ButtonProps = {
    w: 7,
    bg: "green.200"
  };

  // handlers
  const handlePageChange = (nextPage: number) => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = () => {
    return setIsDisabled((oldState) => !oldState);
  };

   console.log('pokemons',pokemons) 
  return (
    <ChakraProvider>
      <Paginator
        isDisabled={isDisabled}
        activeStyles={activeStyles}
        innerLimit={innerLimit}
        currentPage={currentPage}
        outerLimit={outerLimit}
        normalStyles={normalStyles}
        separatorStyles={separatorStyles}
        pagesQuantity={pagesQuantity}
        onPageChange={handlePageChange}
      >
        <Container align="center" justify="space-between" w="full" p={4}>
          <Previous>
            Previous
            {/* Or an icon from `react-icons` */}
          </Previous>
          <PageGroup isInline align="center" />
          <Next>
            Next
            {/* Or an icon from `react-icons` */}
          </Next>
        </Container>
      </Paginator>
      <Center w="full">
        <Button onClick={handleDisableClick}>Disable ON / OFF</Button>
        <Select w={40} ml={3} onChange={handlePageSizeChange}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </Center>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={3}
        px={20}
        mt={20}
      >
        {pokemons?.map(({ name }) => (
          <Center p={4} bg="green.100" key={name}>
            <Text>{name}</Text>
          </Center>
        ))}
      </Grid>
    </ChakraProvider>
  );
};

export default Demo;
