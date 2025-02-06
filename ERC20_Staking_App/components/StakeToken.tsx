import {Card,Heading,Skeleton,Stack,Text} from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";

import { STAKE_TOKEN_ADDRESS } from "../constants/addresses";



export default function StakeToken() {

  const address = useAddress();

  const { contract: stakeTokenContract, isLoading: loadingStakeToken } =

    useContract(STAKE_TOKEN_ADDRESS);

  const { data: tokenBalance, isLoading: loadingTokenBalance } =

    useTokenBalance(stakeTokenContract, address);

  const { contract: stakeTokenCont, isLoading: loadingStakeTok } =

    useContract(STAKE_TOKEN_ADDRESS);

  return (
    <Card p={5} borderWidth={5} borderColor="	#fcd221">
        <Stack>
            <Heading>Stake Token</Heading>
            <Skeleton h={4} w={"50%"} isLoaded={!loadingStakeToken&& !loadingTokenBalance}>
                <Text fontSize={"large"} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>

            </Skeleton>
            <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeToken&&!loadingTokenBalance}>
                <Text>{tokenBalance?.displayValue}</Text>
            </Skeleton>

        </Stack>
    </Card>

   

  );

}