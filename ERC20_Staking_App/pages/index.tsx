

import { NextPage } from "next";
import { Container, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import StakeToken from "../components/StakeToken";
import { useAddress } from "@thirdweb-dev/react";
import RewardToken from "../components/RewardToken";
import Stake from "../components/Stake";

const Home: NextPage = () => {
  const address = useAddress();
  if(!address){
    return(
      <Container maxW={"1200px"}> 
      <Flex h={"92.9vh"} justifyContent={"center"} alignItems={"center"}>
      <Heading>Please connect your wallet</Heading>
      </Flex>
      </Container>
     
    )
  }
  return (
    <Container maxW={"1200px"}>
      <SimpleGrid columns={2  } spacing={4} >
      <StakeToken/>
      <RewardToken/>
      </SimpleGrid>
      <Stake/>
    </Container>
  );
};

export default Home;
