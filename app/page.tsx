'use client'

import * as React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import BalancesCard from '@/components/balances-card'
import DepositCard from '@/components/deposit-card'
import WithdrawCard from '@/components/withdraw-card'
import { useAccount } from 'wagmi'

export default function HomePage() {
  const { status } = useAccount()

  if (status === 'disconnected') {
    return (
      <p className='m-auto text-xs font-light'>
        Please connect your wallet to continue
      </p>
    )
  }

  return (
    <Tabs defaultValue='balances' className='w-full md:w-1/2'>
      <TabsList>
        <TabsTrigger value='balances'>Balances</TabsTrigger>
        <TabsTrigger value='deposit'>Deposit</TabsTrigger>
        <TabsTrigger value='withdraw'>Withdraw</TabsTrigger>
      </TabsList>

      <TabsContent value='balances'>
        <BalancesCard />
      </TabsContent>

      <TabsContent value='deposit'>
        <DepositCard />
      </TabsContent>

      <TabsContent value='withdraw'>
        <WithdrawCard />
      </TabsContent>
    </Tabs>
  )
}
