import{Box,Card,Flex,Heading,Input,SimpleGrid,Skeleton,Stack,Text,useToast } from "@chakra-ui/react";
import {Web3Button,useAddress,useContract,useContractRead,useTokenBalance} from "@thirdweb-dev/react";
import {STAKE_TOKEN_ADDRESS,REWARD_TOKEN_ADDRESS,STAKE_CONTRACT_ADDRESS } from "../constants/addresses";
import React, { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";

export default function Stake() {
    const address = useAddress();
    const { contract: stakeTokenContract } = useContract(
      STAKE_TOKEN_ADDRESS,"token" );
  
    const { contract: rewardStakeTokenContract } = useContract(
      REWARD_TOKEN_ADDRESS,"token"  );
  
    const { contract: stakeContract } = useContract(
  STAKE_CONTRACT_ADDRESS,"custom");
  
    const {
  
      data: stakeInfo,
  
      refetch: refetchStakeInfo,
  
      isLoading: loadingStakeInfo,
  
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
  
      useTokenBalance(stakeTokenContract, address);
  
    const {
  
      data: rewardStakeTokenBalance,
  
      isLoading: loadingRewardStakeTokenBalance,
  
    } = useTokenBalance(rewardStakeTokenContract, address);
  
    useEffect(() => {
  
      setInterval(() => {
  
        refetchStakeInfo();
  
      }, 10000);
  
    }, );
  
    const [stakeAmount, setStakeAmount] = useState<string>("0");
  
    const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
  
    function resetValue() {
  
      setStakeAmount("0");
  
      setUnstakeAmount("0");
  
    }
    const toast=useToast();
  
    return (
      <Card p={5} mt={10} borderWidth={5} borderColor="#5C8B15">
        <Heading>Earn Reward Token</Heading>
        <SimpleGrid columns={2}>
            <Card p={5} m={5} borderWidth={5} borderColor="#a367f0">
                <Box textAlign={"center"} mb={5}>
                <Text fontSize={"xl"} fontWeight={"bold"}>Stake Token:</Text>
                <Skeleton isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance }>


  {stakeInfo && stakeInfo[0] ? (

      <Text>{ethers.utils.formatEther(stakeInfo[0])}{"$ " + stakeTokenBalance?.symbol}</Text>
  ) : (
        <Text>0</Text>
  )}
      </Skeleton>
      </Box>
      <SimpleGrid columns={2} spacing={4}  >
        <Stack spacing={4}>
            <Input borderWidth={2} borderColor="black"
            type="number"
            max={stakeTokenBalance?.displayValue}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            />
            <Web3Button
            contractAddress={STAKE_CONTRACT_ADDRESS}
            action={async(Contract) => {
                await stakeTokenContract?.setAllowance(STAKE_CONTRACT_ADDRESS
                    ,stakeAmount
                    );

                    await Contract.call(
                        "stake",[ethers.utils.parseEther(stakeAmount)]
                    );
                    resetValue();
            }}
            onSuccess={()=>toast({
                title: "Stake Successful",
                status: "success",
                duration :5000,
                isClosable:true,}
            )}
            >Stake</Web3Button>
        </Stack >
        <Stack spacing={4}>
            <Input  borderWidth={2} borderColor="black"
            type="number"
            value={unstakeAmount}
            onChange={(e) => setUnstakeAmount(e.target.value)}
            />
            <Web3Button
            contractAddress={STAKE_CONTRACT_ADDRESS}
            action={async(Contract)=>{
            await Contract.call(
                "withdraw",[ethers.utils.parseEther(unstakeAmount)]
           
                    );
                }}
                    onSuccess={
                        ()=>toast(
                            {
                        title: "UnStake Successful",
                        status: "success",
                        duration :5000,
                        isClosable:true,}
                    )}
              
                    >Unstake</Web3Button>
        </Stack>
      </SimpleGrid>
      </Card>
      <Card p={5} m={5} borderWidth={5} borderColor="#a367f0">
        <Flex h={"100%"} justifyContent={"space-between"} direction={"column"} textAlign={"center"}>
            <Text fontSize={"xl"} fontWeight={"bold"}> Reward Token:</Text>
            <Skeleton isLoaded={!loadingStakeInfo&& !loadingRewardStakeTokenBalance}>
                {stakeInfo && stakeInfo[0] ? (
                <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"}>{ethers.utils.formatEther(stakeInfo[1])}</Text>
                    <Text >{" $ "+ rewardStakeTokenBalance?.symbol}</Text>
                </Box>
                ):(
                <Text>0</Text>
                )}
            </Skeleton>
            <Web3Button  
            contractAddress={STAKE_CONTRACT_ADDRESS}
            action={async (contract)=>{
                await contract.call(
                    "ClaimRewards"
                );
               
            }}
            onSuccess={
                ()=>toast(
                    {
                title: "Rewards Claimed",
                status: "success",
                duration :5000,
                isClosable:true,}
            )}
            >Claim</Web3Button  >
        </Flex>
            </Card>
        </SimpleGrid>
      </Card>
      
  

    
    )}