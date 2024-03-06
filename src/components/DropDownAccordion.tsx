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
        _hover={{ boxShadow:"0px 0px 0px 2px rgba(49, 130, 206, 2) inset", transform: "scale(1.05)"}}
        transition="all 0.3s ease"
        align={"center"}
        as="button"
        onClick={toggleAccordion}
        borderWidth="1px"
        borderColor="#E2E8F0"
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
          zIndex={2}
          overflow="hidden"
          transition="max-height 0.3s ease, opacity 0.1s ease, transform 0.2s ease"
          transform={isOpen ? "translateY(10px)" : "translateY(0px)"}
          maxH={isOpen ? getAutoHeight() : 0}
          opacity={isOpen ? 1 : 0}
          boxShadow={"md"}
          borderRadius={16}
          borderWidth={2}
          bg={"white"}
          w="100%"
        >
          <Box p={2}>{children}</Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default DropDownAccordion;
