import { bundledVincentAbility as tradePerpsBundledVincentAbility } from '@kazemochizuki/hyperliquid-perps';

import { bundledVincentAbility as erc20TransferBundledVincentAbility } from '@lit-protocol/vincent-ability-erc20-transfer';
import { getVincentAbilityClient } from '@lit-protocol/vincent-app-sdk/abilityClient';

import { delegateeSigner } from './signer';

export function getErc20TransferToolClient() {
  return getVincentAbilityClient({
    bundledVincentAbility: erc20TransferBundledVincentAbility,
    ethersSigner: delegateeSigner,
  });
}

export function getTradePerpsToolClient() {
  return getVincentAbilityClient({
    bundledVincentAbility: tradePerpsBundledVincentAbility,
    ethersSigner: delegateeSigner,
  });
}
