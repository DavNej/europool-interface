'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { parseEther } from 'viem'
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
  const { data: cEurBalance } = useGetCEurBalance({ address })
  const { stake } = useStake()

  const [amount, setAmount] = React.useState('0')

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Make a deposit</CardTitle>
        <CardDescription>
          Only cEUR can be deposited to EuroPool
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
              stake({ amount: parseEther(amount) })
            }}>
            Deposit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
