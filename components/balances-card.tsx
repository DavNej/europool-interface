'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { formatBigint } from '@/lib/utils'
import { useGetCEurBalance } from '@/hooks/c-eur'
import { useGetStakedBalanceOf } from '@/hooks/europool'
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Balances</CardTitle>
        <CardDescription>Your available balances</CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex items-center justify-between'>
          <p className='font-medium'>available</p>
          <p>{!!cEurBalance && formatBigint(cEurBalance)} cEUR</p>
        </div>

        <div className='flex items-center justify-between'>
          <p className='font-medium'>staked in EuroPool</p>
          <p>{!!stakedBalance && formatBigint(stakedBalance)} cEUR</p>
        </div>
      </CardContent>
    </Card>
  )
}
