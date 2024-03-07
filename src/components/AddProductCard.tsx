import { Box, Flex, Text } from "@chakra-ui/react";
import InputProductModal from "./inputProductModal/InputProductModal";
import { AddIcon } from "@chakra-ui/icons";

import "@fontsource-variable/quicksand";
import "@fontsource/anton";
import "@fontsource/poppins/800.css";
import useHover from "../hooks/useHover";

function AddProductCard() {
  const { ref, isHovering } = useHover();
  return (
    <Flex flexDir="column" align="center" h="100%" w="100%" bg="red">
      <Flex bg="green" pos="relative" w="100%" flex={1}></Flex>
      <Flex w="100%" flex={1} align="flex-end">
        <Flex justify="center" align="center" w="100%" h="150%" flex={1} bg="white" borderRadius={16} boxShadow={"md"}>
          <Flex>
            <InputProductModal
              title="Add Item"
              button={(onOpen) => (
                <Box
                  as="button"
                  onClick={onOpen}
                  ref={ref}
                  p={5}
                  borderRadius={16}
                  transform={`scale(${isHovering ? 1.1 : 1})`}
                  transition="transform 0.3s ease"
                  borderWidth="2px"
                  borderColor="gray"
                  borderStyle="dashed"
                >
                  <AddIcon fontSize="32px" />
                  <Text fontSize="32px">Add Item</Text>
                </Box>
              )}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default AddProductCard;
