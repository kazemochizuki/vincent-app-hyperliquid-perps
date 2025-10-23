import React, { useState } from 'react';

import { useBackend } from '@/hooks/useBackend';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

export interface TradePerpsProps {
  onCreate?: () => void;
}

export const TradePerps: React.FC<TradePerpsProps> = ({ onCreate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [coin, setCoin] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [leverage, setLeverage] = useState<string>('');

  const { tradePerps } = useBackend();

  const handleTradePerps = async (side: 'buy' | 'sell') => {
    if (!coin || !amount || !leverage) {
      alert('Please fill in all fields: Coin, Amount, and Leverage.');
      return;
    }

    if (Number(amount) <= 0) {
      alert('Amount must be a positive number.');
      return;
    }

    if (!Number.isInteger(Number(leverage)) || Number(leverage) <= 0) {
      alert('Leverage must be a positive integer.');
      return;
    }

    try {
      setLoading(true);
      await tradePerps({
        coin,
        side,
        amount,
        leverage,
      });
      onCreate?.();
    } catch (error) {
      console.error('Error trading perps:', error);
      alert('Error trading perps. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col justify-between bg-white p-6 shadow-sm">
      <div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Trade Perps on Hyperliquid</CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            Trade Perps on Hyperliquid through the Vincent App.
            <br />
            <br />
            <strong>Note:</strong> Ensure deposit USDC to Hyperliquid.
          </CardDescription>
        </CardHeader>

        <CardContent className="my-8">
          <Box className="space-y-6">
            <div>
              <label htmlFor="coin" className="block text-sm font-medium text-gray-700 mb-1">
                Coin
              </label>
              <Input
                id="coin"
                placeholder="e.g., ETH"
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <Input
                id="amount"
                placeholder="e.g., 0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                required
                type="number"
              />
            </div>

            <div>
              <label htmlFor="leverage" className="block text-sm font-medium text-gray-700 mb-1">
                Leverage
              </label>
              <Input
                id="leverage"
                placeholder="e.g., 10"
                value={leverage}
                onChange={(e) => setLeverage(e.target.value)}
                disabled={loading}
                required
                type="number"
              />
            </div>
          </Box>
        </CardContent>

        <Separator className="my-8" />

        <CardFooter className="flex justify-center gap-4">
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => handleTradePerps('buy')}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Buy / Long'}
          </Button>

          <Button
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => handleTradePerps('sell')}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Sell / Short'}
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};
