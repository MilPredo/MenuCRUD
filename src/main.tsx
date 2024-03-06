import React from "react";
import ReactDOM from "react-dom/client";
import App from './App.tsx'

// import { ref, getDatabase } from 'firebase/database';
// import { useList } from 'react-firebase-hooks/database';
// import { Button, ChakraProvider, Flex, Heading, Input } from "@chakra-ui/react";
// import { addData } from "./api/firebase.ts";

// function App() {
//   const [text, setText] = useState("");
//   return (
//     <Flex flexDir="column" justify="center" align="center" h="100vh">
//       <Input
//         onChange={(e) => {
//           setText(e.target.value);
//         }}
//       />
//       <Heading>{text}</Heading>
//       <Button
//         onClick={async () => {
//           const dataRef = addData({ text, boop:"ahah", beep: "dw", bop: ["ahash","asd"] }, "adadad");
//           alert(JSON.stringify(dataRef));
//         }}
//       >
//         Send
//       </Button>
//     </Flex>
//   );
// }
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode> 
      <App /> 
  </React.StrictMode>
);
