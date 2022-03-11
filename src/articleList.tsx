import React ,{useState} from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";


interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

type Post = {
  "Article Title"?: string;
  Abstract?: string;
  Authors?: string;
  Publisher?: string;
  "Publication Year"?:string
};

interface ArticleListProps {
  PostsData: Post[];
}

const ArticleList: React.FC<ArticleListProps> = ({ PostsData }) => {
  const copyPostsData = { ...PostsData };
  const [articlesData, setArticlesData] = useState(PostsData);
  const [articleTolal, setArticleTotal] = useState(PostsData.length)
  console.log('number of articles:',articleTolal)
  return (
    <Box>
      {PostsData.map((post) => (
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
            width="600px"
          >
            <Heading
              marginTop="1"
              textAlign="left"
              fontSize={["large", "2xl", "3xl"]}
            >
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {post["Article Title"]}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              textAlign="left"
              color="gray.500"
              fontSize="sm"
              noOfLines={4}
            >
              {post["Abstract"]}
            </Text>
            <Text fontSize="sm" textAlign="left" color="black">
              <strong>Authors: </strong> {post["Authors"]}
            </Text>
            <Text fontSize="sm" textAlign="left" color="black">
              <strong>Publication Year: </strong> {post["Publication Year"]}
            </Text>
            <Text fontSize="sm" textAlign="left" color="black">
              <strong>Publisher: </strong> {post["Publisher"]}
            </Text>
            
          </Box>
        </Box>
      ))}
      
    </Box>
  );
};

export default ArticleList;
