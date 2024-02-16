'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { useGetCEurBalance } from '@/hooks/c-eur'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useStake } from '@/hooks/europool'

export default function DepositCard() {
  const { address } = useAccount()
  const { data } = useGetCEurBalance({ address })
  const { stake } = useStake()

  function handleSubmit() {
    stake({ amount: BigInt(100) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a deposit</CardTitle>
        <CardDescription>
          Only cEUR can be deposited to EuroPool
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex gap-2'>
          <Input className='flex-1' type='number' />
          <Button type='submit'>Deposit</Button>
        </div>
      </CardContent>
    </Card>
  )
}
