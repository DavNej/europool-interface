'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetStakedBalanceOf, useClaimReward } from '@/hooks/europool'

export default function ClaimRewardCard() {
  const { address } = useAccount()
  const { data: stakedBalance } = useGetStakedBalanceOf({ address })
  const { claimReward } = useClaimReward()

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Claim rewards</CardTitle>
        <CardDescription>
          Claim here the cEUR rewards you&apos;ve accumulated by staking in
          EuroPool
        </CardDescription>
      </CardHeader>

      <CardContent className='flex justify-center'>
        <Button
          className='m-auto'
          onClick={() => {
            claimReward()
          }}>
          Claim
        </Button>
      </CardContent>
    </Card>
  )
}
