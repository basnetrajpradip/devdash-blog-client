import { Box, Badge, Image, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DateTime } from "luxon";
import he from "he";
import heroImg from "../assets/hero-img.png";

export default function BlogCard({ post }) {
  function formatDate(timestamp) {
    return DateTime.fromISO(timestamp).toLocaleString(DateTime.DATE_MED);
  }
  return (
    <>
      <Link to={`/posts/${post._id}`}>
        <Box borderWidth="1px" shadow="md" rounded="lg" overflow="hidden" boxShadow="2xl">
          <Image src={`${he.decode(post.image)}`} alt="Blog image" objectFit="cover" height={"220px"} width={"100%"} fallbackSrc={heroImg}></Image>
          <Box p={{ base: 4, lg: 6 }} display={"flex"} flexDirection={"column"} gap={"0.2"}>
            <Box alignItems="baseline" mb="2" display={"flex"} flexDirection={"column"} gap={"1"}>
              <Box fontWeight="semibold" as="h2" letterSpacing="wider" textTransform="uppercase">
                {he.decode(post.title)}
              </Box>
              <Flex color="gray.600" fontSize="sm" gap={2}>
                <Badge rounded="full" px="2" colorScheme="teal">
                  {he.decode(post.author.username)}
                </Badge>
                <Badge rounded="full" px="2" colorScheme="purple">
                  {formatDate(post.timeStamp)}
                </Badge>
              </Flex>
            </Box>
            <Text mt="1" noOfLines={4} lineHeight="tight" color={useColorModeValue("gray.800", "gray.200")} fontSize="sm">
              {he.decode(post.content)}
            </Text>
          </Box>
        </Box>
      </Link>
    </>
  );
}

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};
