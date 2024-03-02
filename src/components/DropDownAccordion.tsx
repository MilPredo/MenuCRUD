import { ChevronDownIcon } from "@chakra-ui/icons";
import { Box, Divider, Flex, Heading, ResponsiveValue, Stack, useOutsideClick } from "@chakra-ui/react";
import { ReactNode, useRef, useState } from "react";

const DropDownAccordion = ({
  title,
  children,
  size,
}: {
  size: ResponsiveValue<string> | undefined;
  title: string;
  children: ReactNode;
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const getAutoHeight = () => {
    if (!isOpen || !boxRef.current) {
      return 0;
    }
    return boxRef.current.scrollHeight;
  };

  useOutsideClick({
    ref: rootRef,
    handler: () => setIsOpen(false),
  });
  return (
    <Flex ref={rootRef} flexDir="column">
      <Flex
        flexDir={"row"}
        justify={"space-between"}
        borderRadius="md"
        _hover={{ bg: "gray.100" }}
        transition="background-color 0.3s ease-out"
        align={"center"}
        as="button"
        onClick={toggleAccordion}
      >
        <Stack
          direction="row"
          flexGrow={1}
          justify="space-between"
          align="center"
          divider={<Divider orientation="vertical" />}
          spacing="0"
          p={2}
          gap={2}
        >
          <Heading size={size}>{title}</Heading>
          <ChevronDownIcon
            fontSize={"2xl"}
            transition="transform 0.3s ease"
            transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
          />
        </Stack>
      </Flex>
      <Box position="relative">
        <Box
          pos={"absolute"}
          ref={boxRef}
          zIndex={1}
          overflow="hidden"
          transition="max-height 0.3s ease, opacity 0.1s ease, transform 0.2s ease"
          transform={isOpen ? "translateY(10px)" : "translateY(0px)"}
          maxH={isOpen ? getAutoHeight() : 0}
          opacity={isOpen ? 1 : 0}
          boxShadow={"md"}
          borderRadius={16}
          borderWidth={2}
          bg={"white"}
        >
          <Box p={2}>{children}</Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default DropDownAccordion;
