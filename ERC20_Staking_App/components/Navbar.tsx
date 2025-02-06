import { Container,Flex,Heading } from "@chakra-ui/react";
import {ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
    return(
        <Container>
            <Flex direction={"row"} justifyContent={"space-between"}>
            <Heading>.....Staking..App.....</Heading>
            <ConnectWallet/>
            </Flex>
        </Container>
    )
}