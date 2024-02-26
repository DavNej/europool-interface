'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { formatBigint } from '@/lib/utils'
import { useGetTokenBalance, useGetTokenSymbol } from '@/hooks/c-eur'
import {
  useGetRewardsOf,
  useGetStakedBalanceOf,
  useGetTotalStaked,
} from '@/hooks/europool'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function BalancesCard() {
  const { address } = useAccount()
  const { data: tokenBalance } = useGetTokenBalance({ address })
  const { data: symbol } = useGetTokenSymbol()
  const { data: stakedBalance } = useGetStakedBalanceOf({ address })
  const { data: totalStaked } = useGetTotalStaked()
  const { data: rewards } = useGetRewardsOf({ address })

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Balances</CardTitle>
        <CardDescription>Your available balances</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex items-center justify-between'>
          <p className='font-medium'>Deposit balance</p>
          <p>
            {formatBigint(stakedBalance)} {symbol}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='font-medium'>Rewards earned</p>
          <p>
            {formatBigint(rewards, 18)} {symbol}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='font-medium'>Available balance</p>
          <p>
            {formatBigint(tokenBalance)} {symbol}
          </p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='font-medium'>Total Staked in EuroPool</p>
          <p>
            {formatBigint(totalStaked)} {symbol}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
