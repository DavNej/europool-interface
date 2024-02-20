'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useGetStakedBalanceOf, useWithdraw } from '@/hooks/europool'
import { parseEther } from 'viem'

export default function WithdrawCard() {
  const { address } = useAccount()
  const { data: stakedBalance } = useGetStakedBalanceOf({ address })
  const { withdraw } = useWithdraw()

  const [amount, setAmount] = React.useState('0')

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Withdraw funds</CardTitle>
        <CardDescription>
          Only cEUR can be withdrawn from EuroPool
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className='flex gap-2'>
          <Input
            className='flex-1'
            type='number'
            onChange={e => {
              setAmount(e.target.value)
            }}
          />
          <Button
            onClick={() => {
              withdraw({ amount: parseEther(amount) })
            }}>
            Withdraw
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
