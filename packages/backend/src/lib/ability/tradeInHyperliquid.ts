import { Response } from 'express';


import { getDataFromJWT } from './jwt';
import { VincentAuthenticatedRequest } from './types';
import { getErc20TransferToolClient, getTradePerpsToolClient } from './vincentAbilities';
import { env } from '../env';

const { ALCHEMY_API_KEY, ALCHEMY_POLICY_ID, BASE_RPC_URL, VINCENT_DELEGATEE_PRIVATE_KEY } = env;

const CHAIN = 'arbitrum';
const HYPERLIQUID_DEPOSIT_BRIDGE2_ADDRESS = '0x2Df1c51E09aECF9cacB7bc98cB1742757f163dF7';
const ARBITRUM_USDC_ADDRESS = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831';

export const handleTradePerpsRoute = async (req: VincentAuthenticatedRequest, res: Response) => {
  const {
    pkpInfo: { ethAddress },
  } = getDataFromJWT(req);
  const tradeContext = { delegatorPkpEthAddress: ethAddress };

  const { amount, coin, leverage, side } = req.body;
  const tradeParams = {
    amount,
    coin,
    leverage,
    side,
    delegateePrivateKey: VINCENT_DELEGATEE_PRIVATE_KEY,
  };

  const tradePerpsToolClient = getTradePerpsToolClient();

  const tradePrecheckResult = await tradePerpsToolClient.precheck(tradeParams, tradeContext);
  if (!tradePrecheckResult.success) {
    throw new Error(`Trade Perps tool precheck failed: ${tradePrecheckResult}`);
  }

  const tradeExecutionResult = await tradePerpsToolClient.execute(tradeParams, tradeContext);
  if (!tradeExecutionResult.success) {
    throw new Error(`Trade Perps tool execution failed: ${tradeExecutionResult}`);
  }

  res.json({ data: tradeExecutionResult.result, success: true });
};

export const handleDepositUSDCRoute = async (req: VincentAuthenticatedRequest, res: Response) => {
  const {
    pkpInfo: { ethAddress },
  } = getDataFromJWT(req);
  const depositContext = { delegatorPkpEthAddress: ethAddress };

  const { amount } = req.body;
  let alchemyGasSponsor = false;
  if (ALCHEMY_API_KEY && ALCHEMY_POLICY_ID) {
    alchemyGasSponsor = true;
  }

  const depositParams = {
    alchemyGasSponsor,
    amount,
    alchemyGasSponsorApiKey: ALCHEMY_API_KEY,
    alchemyGasSponsorPolicyId: ALCHEMY_POLICY_ID,
    chain: CHAIN,
    rpcUrl: BASE_RPC_URL,
    to: HYPERLIQUID_DEPOSIT_BRIDGE2_ADDRESS,
    tokenAddress: ARBITRUM_USDC_ADDRESS,
  };

  const erc20TransferToolClient = getErc20TransferToolClient();
  const depositPrecheckResult = await erc20TransferToolClient.precheck(
    depositParams,
    depositContext
  );
  if (!depositPrecheckResult.success) {
    throw new Error(`ERC20 Transfer tool precheck failed: ${depositPrecheckResult}`);
  }

  const depositExecutionResult = await erc20TransferToolClient.execute(
    depositParams,
    depositContext
  );
  if (!depositExecutionResult.success) {
    throw new Error(`ERC20 Transfer tool execution failed: ${depositExecutionResult}`);
  }

  res.json({ data: depositExecutionResult.result.txHash, success: true });
};
