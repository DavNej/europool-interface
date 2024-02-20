'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { formatBigint } from '@/lib/utils'
import { useGetCEurBalance } from '@/hooks/c-eur'
import { useGetRewardsOf, useGetStakedBalanceOf } from '@/hooks/europool'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function BalancesCard() {
  const { address } = useAccount()
  const { data: cEurBalance } = useGetCEurBalance({ address })
  const { data: stakedBalance } = useGetStakedBalanceOf({ address })
  const { data: rewards } = useGetRewardsOf({ address })

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Balances</CardTitle>
        <CardDescription>Your available balances</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex items-center justify-between'>
          <p className='font-medium'>Available</p>
          <p>{formatBigint(cEurBalance)} cEUR</p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='font-medium'>Staked in EuroPool</p>
          <p>{formatBigint(stakedBalance)} cEUR</p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='font-medium'>Last updated rewards</p>
          <p>{formatBigint(rewards, 18)} cEUR</p>
        </div>
      </CardContent>
    </Card>
  )
}
