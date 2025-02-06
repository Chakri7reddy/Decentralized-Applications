import {Card,Heading,Skeleton,Stack,Text} from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";

import { REWARD_TOKEN_ADDRESS } from "../constants/addresses";

export default function RewardStakeToken() {
    const address=useAddress();
    const { contract: rewardStakeTokenContract, isLoading: loadingRewardToken } =

    useContract(REWARD_TOKEN_ADDRESS);

  const { data: tokenBalance, isLoading: loadingTokenBalance } =

    useTokenBalance(rewardStakeTokenContract, address);

    return (
<Card p={5} borderWidth={5} borderColor="	#fcd221" >
        <Stack>
            <Heading>Reward Token</Heading>
            <Skeleton h={4} w={"50%"} isLoaded={!loadingRewardToken&& !loadingTokenBalance}>
                <Text fontSize={"large"} fontWeight={"bold"}>${tokenBalance?.symbol}</Text>

            </Skeleton>
            <Skeleton h={4} w={"100%"} isLoaded={!loadingRewardToken&&!loadingTokenBalance}>
                <Text>{tokenBalance?.displayValue}</Text>
            </Skeleton>

        </Stack>
    </Card>

    )
}