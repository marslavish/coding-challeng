import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Button,
  useColorModeValue,
  SimpleGrid,
  useDisclosure,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Icon,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { Asset } from "@chain-registry/types";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";

import { RootStore } from "../store";
import PoolsCard from "./pools-card";

const TokenSelect = ({
  imgSrc,
  symbol,
  onOpen,
}: {
  imgSrc: string;
  symbol: string;
  onOpen: () => void;
}) => {
  return (
    <Box
      h={20}
      mb={4}
      px={4}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex
        w="40%"
        h="100%"
        align="center"
        _hover={{ cursor: "pointer" }}
        onClick={onOpen}
      >
        <Image
          w={{ base: 10, md: 12, lg: 14 }}
          h={{ base: 10, md: 12, lg: 14 }}
          src={imgSrc}
          mr={2}
        />
        <Heading as="h2" fontSize="2xl" ml={2} mr={1}>
          {symbol}
        </Heading>
        <Icon as={ChevronDownIcon} w={6} h={6} />
      </Flex>
    </Box>
  );
};

const ListPools = ({ store }: { store: RootStore }) => {
  const { poolStore, assetStore } = store;

  const [selectedAssets, setSelectedAssets] = useState<Asset[]>([
    assetStore.chain.assets[0],
    assetStore.chain.assets[1],
  ]);
  const [currentSelect, setCurrentSelect] = useState<number>(0);

  const {
    isOpen: isNewPoolModalOpen,
    onOpen: onNewPoolModalOpen,
    onClose: onNewPoolModalClose,
  } = useDisclosure();
  const {
    isOpen: isTokensModalOpen,
    onOpen: onTokensModalOpen,
    onClose: onTokensModalClose,
  } = useDisclosure();

  const onAddPool = () => {
    poolStore.addPool(selectedAssets[0], selectedAssets[1]);
    onNewPoolModalClose();
  };

  const isSameToken = () => {
    return selectedAssets[0].base === selectedAssets[1].base;
  };

  const handleSelectClick = (num: number) => {
    setCurrentSelect(num);
    onTokensModalOpen();
    assetStore.updateFilter("");
  };

  return (
    <Box p={4}>
      <Modal isOpen={isNewPoolModalOpen} onClose={onNewPoolModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Pool</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TokenSelect
              imgSrc={selectedAssets[0].logo_URIs.png}
              symbol={selectedAssets[0].symbol}
              onOpen={() => handleSelectClick(0)}
            />
            <TokenSelect
              imgSrc={selectedAssets[1].logo_URIs.png}
              symbol={selectedAssets[1].symbol}
              onOpen={() => handleSelectClick(1)}
            />
            {isSameToken() && (
              <Text as="i" color="red.500">
                *The two tokens can't be the same.
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onNewPoolModalClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={onAddPool}
              disabled={isSameToken()}
            >
              Add Pool
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isTokensModalOpen} onClose={onTokensModalClose}>
        <ModalOverlay bg="blackAlpha.800" />
        <ModalContent>
          <ModalBody>
            <InputGroup my={4}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="tel"
                placeholder="Search tokens"
                value={assetStore.filter}
                onChange={(e) => assetStore.updateFilter(e.target.value)}
              />
            </InputGroup>
            <Box maxH={400} overflow="scroll" pr={4}>
              {assetStore.filteredAssets.map((asset) => {
                return (
                  <Box
                    h={20}
                    mb={2}
                    px={2}
                    key={asset.base}
                    onClick={() => {
                      setSelectedAssets((prev) =>
                        prev.map((v, i) => {
                          if (i === currentSelect) return asset;
                          return v;
                        })
                      );
                      onTokensModalClose();
                    }}
                    borderRadius="lg"
                    overflow="hidden"
                    _hover={{
                      cursor: "pointer",
                      background: "blackAlpha.50",
                    }}
                  >
                    <Flex h="100%" align="center">
                      <Image
                        w={{ base: 10, md: 12, lg: 14 }}
                        h={{ base: 10, md: 12, lg: 14 }}
                        src={asset.logo_URIs.png}
                        mr={2}
                      />
                      <Heading as="h2" fontSize="2xl" ml={2} mr={1}>
                        {asset.symbol}
                      </Heading>
                    </Flex>
                  </Box>
                );
              })}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex align="center" mb={6}>
        <Heading as="h2" fontSize="2xl" mr={4}>
          Active Pools
        </Heading>
        {poolStore.poolsData.length > 0 && (
          <Button
            display={{ base: "none", sm: "block" }}
            onClick={onNewPoolModalOpen}
          >
            Create New Pool
          </Button>
        )}
      </Flex>
      <SimpleGrid columns={{ sm: 2 }} gap={4} maxW={{ sm: "md" }} mb={8}>
        <Box>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            mb={1}
          >
            OSMO Price
          </Text>
          <Text fontSize="3xl" fontWeight="bold" py={2}>
            $4.41
          </Text>
        </Box>
        <Box>
          <Text
            fontWeight="semibold"
            color={useColorModeValue("blackAlpha.600", "whiteAlpha.600")}
            mb={2}
          >
            Reward distribution on
          </Text>
          <Flex align="center">
            <Text fontSize="3xl" fontWeight="bold">
              12
            </Text>
            <Box
              borderRadius="lg"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              px={3}
              mx={1}
            >
              <Text fontSize="2xl" fontWeight="bold">
                H
              </Text>
            </Box>
            <Text fontSize="3xl" fontWeight="bold">
              19
            </Text>
            <Box
              borderRadius="lg"
              bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
              px={3}
              mx={1}
            >
              <Text fontSize="2xl" fontWeight="bold">
                M
              </Text>
            </Box>
          </Flex>
        </Box>
      </SimpleGrid>
      <Box
        bg={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
        m={-4}
        px={4}
        py={6}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          My Pools
        </Text>
        {poolStore.poolsData.length > 0 ? (
          <PoolsCard poolsData={poolStore.poolsData} />
        ) : (
          <Box
            h={100}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            mb={50}
          >
            <Text fontSize="2xl">No pools here.</Text>
            <Button
              colorScheme="teal"
              onClick={onNewPoolModalOpen}
              variant="solid"
              size="md"
            >
              Create New Pool
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default observer(ListPools);
