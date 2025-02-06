import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "mumbai";

function MyApp({ Component, pageProps }: AppProps) {
  const pageStyle = {
    backgroundColor: "#234E70", // Dark blue color
    color: "white", 
    minHeight:"100vh",// Text color
  };
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={activeChain}
    >
      <ChakraProvider>
      <div style={pageStyle} >
        <Navbar/>
        
      <Component {...pageProps} />
      <Box maxH={8} maxW={100}>
      
      </Box>
      </div>
      </ChakraProvider>
     
    </ThirdwebProvider>
  );
}

export default MyApp;

