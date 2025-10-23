import React, { useState, FormEvent } from 'react';

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

export interface DepositUSDCProps {
  onCreate?: () => void;
}

export const DepositUSDC: React.FC<DepositUSDCProps> = ({ onCreate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [amount, setAmount] = useState<string>('');

  const { depositUSDC } = useBackend();

  const handleDepositUSDC = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!amount) {
      alert('Please fill in Amount.');
      return;
    }

    if (Number(amount) < 5.0) {
      alert('At least 5 USDC.');
      return;
    }

    try {
      setLoading(true);
      await depositUSDC({
        amount,
      });
      onCreate?.();
    } catch (error) {
      console.error('Error depositing USDC:', error);
      alert('Error depositing USDC. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex flex-col justify-between bg-white p-6 shadow-sm">
      <form onSubmit={handleDepositUSDC}>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Deposit USDC on Hyperliquid</CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            ERC20 Transfer to Hyperliquid: Deposit Bridge 2
            (0x2Df1c51E09aECF9cacB7bc98cB1742757f163dF7)
          </CardDescription>
        </CardHeader>

        <CardContent className="my-8">
          <Box className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <Input
                id="amount"
                placeholder="e.g., 5.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={loading}
                required
                type="number"
              />
            </div>
          </Box>
        </CardContent>

        <Separator className="my-8" />

        <CardFooter className="flex justify-center">
          <Button className="w-full" type="submit">
            Deposit USDC
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
