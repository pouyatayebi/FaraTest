import React, { useState } from "react";
import { Graph } from "react-d3-graph";
import { useForm } from "react-hook-form";
import {
  Box,
  HStack,
  Container,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  List,
  ListItem,
  ListIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import FilterButton from "./filterButton";

const GraphApp = ({ networkData }) => {
  const copyNetworkData = { ...networkData };
  const [ref, setRef] = React.useState(null);
  const [graphData, setGraphData] = useState(networkData);

  const isNotSingleNode = (node) => {
    for (const link of graphData.links) {
      if (link.source === node.id || link.target === node.id) {
        return true;
      }
    }
    return false;
  };

  const resetGraphData = () => {
    setGraphData(copyNetworkData);
    resetNodesPositions();
  };


  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmitFilterLinks = (data) => {
 

    const filteredGraphByLinkValue = {
      nodes: copyNetworkData.nodes,
      links: copyNetworkData.links.filter(
        (link) => link.value < data.linkvalue
      ),
    };
    setGraphData(filteredGraphByLinkValue);
  };
  console.log("garaph data", graphData);
  const config = {
    directed: false,
    automaticRearrangeAfterDropNode: true,
    collapsible: false,
    height: window.innerHeight,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 12,
    minZoom: 0.05,
    initialZoom: 0.5,
    nodeHighlightBehavior: true, // comment this to reset nodes positions to work
    panAndZoom: false,
    staticGraph: false,
    width: 0.5 * window.innerWidth,
    d3: {
      alphaTarget: 0.05,
      gravity: -250,
      linkLength: 120,
      linkStrength: 2,
    },
    node: {
      color: (n) => n.color,
      fontColor: "black",
      fontSize: 10,
      fontWeight: "normal",
      highlightColor: "red",
      highlightFontSize: 14,
      highlightFontWeight: "bold",
      highlightStrokeColor: "red",
      highlightStrokeWidth: 1.5,
      labelProperty: (n) => `${n.id} / group:${n.group}`,
      mouseCursor: "crosshair",
      opacity: 0.9,
      renderLabel: true,
      size: 500,
      strokeColor: "none",
      strokeWidth: 1.5,
      svg: "",
      symbolType: "circle",
      viewGenerator: null,
    },
    link: {
      color: "lightgray",
      highlightColor: "red",
      mouseCursor: "pointer",
      opacity: 1,
      semanticStrokeWidth: true,
      strokeWidth: 3,
      type: "STRAIGHT",
    },
  };

  const resetNodesPositions = React.useCallback(() => {
    if (ref) ref.resetNodesPositions();
  }, [ref]);

  const handleRefChange = React.useCallback((ref) => {
    setRef(ref);
  }, []);

  const filterSingleNodes = () => {
    const filteredNodes = {
      nodes: graphData.nodes.filter((node) => isNotSingleNode(node)),
      links: graphData.links,
    };
    setGraphData(filteredNodes);
    console.log("dont show single nodes", filteredNodes);
  };

  return (
    <Container border="3px solid teal" borderRadius="6px" m={8}>
      {/* <button onClick={resetNodesPositions}>Reset Nodes</button> */}

      {graphData !== null && (
        <VStack>
          <Box>
            <Text>The graph is loaded with the following specifications:</Text>
            <List spacing={3} mb={8}>
              <ListItem textAlign="left">
                <ListIcon as={MdCheckCircle} color="teal" />
                Nodes: <strong>{graphData.nodes.length}</strong>
              </ListItem>
              <ListItem textAlign="left">
                <ListIcon as={MdCheckCircle} color="teal" />
                Links: <strong>{graphData.links.length}</strong>
              </ListItem>
              <ListItem textAlign="left">
                <ListIcon as={MdCheckCircle} color="teal" />
                Loading Time: <strong>600</strong> (ms)
              </ListItem>
            </List>
          </Box>
          <HStack>
            <form onSubmit={handleSubmit(onSubmitFilterLinks)}>
              <HStack border="1px solid teal" borderRadius="6px">
                <FormControl isInvalid={errors.name}>
                  <Input
                    border={0}
                    width={100}
                    outline="none"
                    id="linkvalue"
                    type="number"
                    placeholder="Filter Links values"
                    {...register("linkvalue", {
                      required: "This is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FilterButton
                  text="Filter Links"
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                />
              </HStack>
            </form>
            <Button
              onClick={filterSingleNodes}
              colorScheme="teal"
              variant="outline"
            >
              Filter Single Nodes
            </Button>
            <Button
              onClick={resetGraphData}
              colorScheme="teal"
              variant="outline"
            >
              Reset Graph
            </Button>
          </HStack>
        </VStack>
      )}
      <Graph
        id="graph-id"
        data={graphData}
        config={config}
        ref={handleRefChange}
        style={{ background: "pink" }}
      />
    </Container>
  );
};

export default GraphApp;
