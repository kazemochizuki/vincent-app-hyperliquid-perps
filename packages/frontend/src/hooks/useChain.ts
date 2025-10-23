import { useState } from 'react';
import { LIT_EVM_CHAINS } from '@lit-protocol/constants';
import { LITEVMChain } from '@lit-protocol/types';
import { ethers } from 'ethers';

const ERC20_ABI = ['function balanceOf(address owner) view returns (uint256)'];

const USDC_CONTRACT_ADDRESSES: Record<number, string> = {
  [LIT_EVM_CHAINS.arbitrum.chainId]: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
};

export const useChain = () => {
  const [chain, setChain] = useState<LITEVMChain>(LIT_EVM_CHAINS.arbitrum);

  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrls[0]);

  const usdcContract = new ethers.Contract(
    USDC_CONTRACT_ADDRESSES[chain.chainId],
    ERC20_ABI,
    provider
  );

  return {
    chain,
    setChain,
    provider,
    usdcContract,
  };
};
