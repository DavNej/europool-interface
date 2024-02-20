'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useClaimReward } from '@/hooks/europool'

export default function ClaimRewardCard() {
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
          className='w-full'
          onClick={() => {
            claimReward()
          }}>
          Claim
        </Button>
      </CardContent>
    </Card>
  )
}
