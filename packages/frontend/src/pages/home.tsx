import React, { useState } from 'react';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

import { TradePerps } from '@/components/trade-perps';
import { DepositUSDC } from '@/components/deposit-usdc';

import { Info } from '@/components/info';
import { Wallet } from '@/components/wallet';

enum Tab {
  TradePerps = 'trade-perps',
  DepositUSDC = 'deposit-usdc',
  Wallet = 'wallet',
}

export const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.TradePerps);

  return (
    <div
      className={'flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100'}
    >
      <Tabs
        data-testId="tabs"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as Tab)}
        className="bg-white p-6 shadow-sm w-full xl:max-w-4xl h-full"
      >
        <TabsList className="mb-4 flex space-x-2 rounded-md bg-gray-200 p-2 w-full">
          <TabsTrigger value={Tab.TradePerps}>Trade Perps</TabsTrigger>
          <TabsTrigger value={Tab.DepositUSDC}>Deposit USDC</TabsTrigger>
          <TabsTrigger value={Tab.Wallet}>Wallet</TabsTrigger>
        </TabsList>

        <TabsContent value={Tab.TradePerps}>
          <TradePerps />
        </TabsContent>
        <TabsContent value={Tab.DepositUSDC}>
          <DepositUSDC />
        </TabsContent>
        <TabsContent value={Tab.Wallet}>
          <Wallet />
        </TabsContent>
      </Tabs>

      <Info />
    </div>
  );
};
