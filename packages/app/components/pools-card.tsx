import React from "react";
import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  SimpleGrid,
  Image,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";

import { PoolData } from "../store/pool-store";

const PoolsCard = ({ poolsData }: { poolsData: PoolData[] }) => {
  return (
    <SimpleGrid columns={{ sm: 2, lg: 4 }} gap={4} mb={8}>
      {poolsData.map(
        ({
          id,
          token1,
          token2,
          poolLiquidity,
          apr,
          myLiquidity,
          myBoundedAmount,
          longestDaysUnbonding,
        }) => {
          return (
            <Box
              key={id}
              borderRadius="lg"
              border="1px solid"
              borderColor={
                longestDaysUnbonding
                  ? useColorModeValue("primary.500", "primary.300")
                  : "transparent"
              }
              boxShadow="md"
              _hover={{
                cursor: "pointer",
                borderColor: longestDaysUnbonding
                  ? useColorModeValue("primary.500", "primary.300")
                  : "orange.300",
              }}
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              p={4}
            >
              <Flex align="center" mb={4}>
                <Flex
                  position="relative"
                  align="center"
                  pr={{ base: 10, sm: 14 }}
                >
                  <Box
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue(
                      "primary.100",
                      "primary.900"
                    )}
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token1.imgSrc} />
                  </Box>
                  <Box
                    position="absolute"
                    left={{ base: 8, sm: 10 }}
                    w={{ base: 12, md: 14, lg: 16 }}
                    h={{ base: 12, md: 14, lg: 16 }}
                    bg="whiteAlpha.900"
                    borderRadius="full"
                    border="1px solid"
                    borderColor={useColorModeValue(
                      "primary.100",
                      "primary.900"
                    )}
                    overflow="hidden"
                    p={0.5}
                  >
                    <Image src={token2.imgSrc} />
                  </Box>
                </Flex>
                <Flex flexDirection="column" justify="center">
                  <Text fontSize="xl" fontWeight="extrabold">
                    Pools #{id}
                  </Text>
                  <Text
                    fontWeight="bold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                    wordBreak="break-word"
                  >
                    {token1.name}/{token2.name}
                  </Text>
                </Flex>
              </Flex>
              <Grid
                templateColumns={{ lg: "1fr 1fr" }}
                gap={{ base: 2, md: 4 }}
              >
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    Pool Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                    wordBreak="break-word"
                  >
                    ${poolLiquidity.toLocaleString()}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    Apr
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    {apr}%
                  </Text>
                </GridItem>
                <GridItem colSpan={{ lg: 2 }}>
                  <Divider
                    borderColor={useColorModeValue(
                      "primary.300",
                      "primary.100"
                    )}
                  />
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    My Liquidity
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myLiquidity}
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    fontWeight="semibold"
                    color={useColorModeValue(
                      "blackAlpha.600",
                      "whiteAlpha.600"
                    )}
                  >
                    My Bounded Amount
                  </Text>
                  <Text
                    fontSize={{ base: "lg", sm: "xl" }}
                    fontWeight="extrabold"
                  >
                    ${myBoundedAmount}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          );
        }
      )}
    </SimpleGrid>
  );
};

export default observer(PoolsCard);
