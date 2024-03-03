import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useState, useRef } from "react";

interface SearchBarProps {
  onChange: (val: string) => void;
  onCancel: () => void;
  onEnter: (val: string) => void;
}
function SearchBar({ onChange, onCancel, onEnter }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <InputGroup borderColor="gray.500" size="lg" m={2}>
      <InputLeftElement
        pointerEvents={searchQuery === "" ? "none" : undefined}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setSearchQuery("");
          inputRef.current?.focus();
          onCancel();
        }}
      >
        {searchQuery === "" ? (
          <SearchIcon color="gray.700" />
        ) : (
          <Center>
            <CloseIcon color="gray.700" />
          </Center>
        )}
      </InputLeftElement>
      <Input
        ref={inputRef}
        fontWeight="500"
        color="gray.700"
        _hover={{ borderColor: "gray.700" }}
        focusBorderColor="gray.700"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter(searchQuery);
          }
        }}
      />
    </InputGroup>
  );
}

export default SearchBar;
