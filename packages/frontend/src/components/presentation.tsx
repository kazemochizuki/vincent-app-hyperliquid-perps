import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info } from '@/components/info';
import { useBackend } from '@/hooks/useBackend';

export const Presentation: React.FC = () => {
  const { getJwt } = useBackend();

  return (
    <Card data-testId="presentation" className="w-full md:max-w-md bg-white p-8 shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Trade Perps in Hyperliquid</CardTitle>
        <CardDescription className="text-gray-600">
          Place perps order directly from Vincent.
        </CardDescription>
      </CardHeader>

      <Separator className="my-4" />

      <CardContent className="text-center">
        <p className="mt-4 text-gray-700">To get started, please Connect with Vincent.</p>
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        <Button onClick={getJwt} className="bg-purple-600 text-white hover:bg-purple-700">
          Connect with Vincent
        </Button>
        <Info />
      </CardFooter>
    </Card>
  );
};
