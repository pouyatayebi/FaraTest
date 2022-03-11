import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  chakra,
  UnorderedList,
  List,
  ListIcon,
  ListItem,
  ChakraProvider,
  CSSReset,
  extendTheme,
  Box,
  Button,
  Text,
  Link,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  VStack,
  Code,
  Grid,
  theme as chakraTheme,
  Heading,
  Flex,
  Container,
  Icon
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import GraphApp from "./GraphApp";
import { MdCheckCircle } from "react-icons/md";
import { CheckIcon } from '@chakra-ui/icons'
import ArticleList from "./pagination";
import Demo from "./al2";
import ItemPage from "./ItemPage";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const styles = {
  global: () => ({
    "*": {
      _focus: {
        outline: "none !important",
      },
    },
    body: {
      color: "gray.800",
      boxSizing: "border-box",
      lineHeight: "1.9",
    },
    ".App": {
      textAlign: "center",
    },
    a: {
      textDecoration: "none!important",
      fontFamily: "inherit!important",
      _hover: { textDecoration: "none!important" },
    },
    "#graph-id-graph-wrapper": {
      margin: "0 auto",
    },
    "#graph-id-graph-wrapper svg": {
      boxShadow:
        "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
      height: "600px!important",
      width: "auto!important",
      minWidth: "600px!important",
      margin: "50px auto !important",
    },
  }),
};

const theme = extendTheme({ ...chakraTheme, colors, styles });

export const App = () => {
  const [graphData, setGraphData] = useState(null);
  const [graphLoding, setGraphLoading] = useState(false);
  const [graphDataIsLoaded, setGraphDataIsLoaded] = useState(false);
  const [articleData, setArticleData] = useState(null);
  const [articleLoding, setArticleLoading] = useState(false);
  const [articleDataIsLoaded, setArticleDataIsLoaded] = useState(false);
  const grapgDataUrl = "http://localhost:3000/data/NETWORK.json";
  const articleDataUrl = "http://localhost:3000/data/ARTICLE.json";
  const [tabValue, setTabValue] = useState(0);
  const tabChange = (index) => {
    console.log(index);
    setTabValue(index);
  };

  const getGraphDataWithAxios = async () => {
    const response = await axios.get(grapgDataUrl);
    const responseData = await response.data;
    // setGraphData(() => ({ ...responseData, ...responseData.nodes.map(node => ({ ...node, "color": "#235688" })) }));
    setGraphData(responseData);
  };
  const getArticleDataWithAxios = async () => {
    const response = await axios.get(articleDataUrl);
    const responseData = await response.data;
    setArticleData(responseData);
  };
  const handleLoadGraphData = () => {
    setArticleLoading(true);
    setArticleData(null);
    setTimeout(() => {
      getGraphDataWithAxios();
      setArticleLoading(false);
      setGraphDataIsLoaded(true);
    }, 3000);
  };
  const handleLoadArticleData = () => {
    setGraphLoading(true);
    setGraphData(null);
    setTimeout(() => {
      getArticleDataWithAxios();
      setGraphLoading(false);
      setArticleDataIsLoaded(true)
    }, 3000);
  };

  useEffect(() => {}, [tabValue]);

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="30vh" p={8}>
          <VStack spacing={8}>
            <Logo h="20vmin" pointerEvents="none" />
            <Text textAlign="left">
              This is a test application that consists of two parts. The first
              part loads information about the network graph and the second part
              loads the information about the articles.
            </Text>
            <Text textAlign="left">
              By clicking on any of the two buttons below, you can see the
              information related to that section
            </Text>
          </VStack>
          <Box position="relative">
            <Tabs
              variant="enclosed"
              colorScheme="green"
              position="sticky"
              left={0}
              top={0}
              p={9}
              isManual
              isLazy
              lazyBehavior
              onChange={tabChange}
            >
              <TabList>
                <Tab>Graph App</Tab>
                <Tab>Artcile App</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box bg="teal.300" p={9} borderRadius={"lg"}>
                    <Heading as="h2">The Simple Graph App</Heading>
                    <Heading as="h4" fontSize="sm">
                      This app displays a graph with data taken from .json file
                    </Heading>

                    {graphDataIsLoaded ? (
                      <Text color={"pink.600"} fontWeight="bold">
                        <Icon as={CheckIcon} />Graph Data is Loded to Page
                      </Text>
                    ) : (
                      <Button
                        isLoading={graphLoding}
                        colorScheme="orange"
                        variant="solid"
                        onClick={handleLoadGraphData}
                        m={8}
                      >
                        Click To Load Graph data
                      </Button>
                    )}
                  </Box>

                  {graphData && <GraphApp networkData={graphData} />}
                </TabPanel>
                <TabPanel>
                  <Box bg="cyan.400" p={9} borderRadius={"lg"}>
                    <Heading as="h2">The Simple Articles App</Heading>
                    <Heading as="h4" fontSize="sm">
                      This app displays articles with data taken from .json file
                    </Heading>
                    {articleDataIsLoaded ? (
                      <Text color={"pink.600"} fontWeight="bold">
                        <Icon as={CheckIcon} />Article Data is Loded to Page
                      </Text>
                    ) : (
                      <Button
                        isLoading={articleLoding}
                        colorScheme="orange"
                        variant="solid"
                        onClick={handleLoadArticleData}
                        m={8}
                      >
                        Click To Load Article data
                      </Button>
                    )}
                  </Box>

                  {articleData && (
                    <Container maxW={"8xl"}>
                      <ArticleList PostsData={articleData} />
                    </Container>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
