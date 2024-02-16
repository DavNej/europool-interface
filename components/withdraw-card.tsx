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
import { useWithdraw } from '@/hooks/europool'

export default function WithdrawCard() {
  const { address } = useAccount()
  const { data } = useGetCEurBalance({ address })
  const { withdraw } = useWithdraw()

  function handleSubmit() {
    withdraw({ amount: BigInt(100) })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw funds</CardTitle>
        <CardDescription>
          Only cEUR can be withdrawn from EuroPool
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex gap-2'>
          <Input className='flex-1' type='number' />
          <Button type='submit'>Withdraw</Button>
        </div>
      </CardContent>
    </Card>
  )
}
