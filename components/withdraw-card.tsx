'use client'

import * as React from 'react'
import { useAccount } from 'wagmi'
import { parseEther } from 'viem'
import { useGetStakedBalanceOf, useWithdraw } from '@/hooks/europool'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { formatBigint } from '@/lib/utils'

export default function WithdrawCard() {
  const { address } = useAccount()
  const { data: stakedBalance } = useGetStakedBalanceOf({ address })
  const { withdraw } = useWithdraw()

  const stakedBalanceNumber = Number(formatBigint(stakedBalance))

  const formSchema = z.object({
    amount: z.coerce.number().step(0.01).min(0).max(stakedBalanceNumber),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 0 },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    withdraw({ amount: parseEther(values.amount.toString()) })
  }

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Withdraw funds</CardTitle>
        <CardDescription>
          Only cEUR can be withdrawn from EuroPool
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='amount'
              render={({ field }) => (
                <FormItem className='flex items-center gap-2 space-y-0'>
                  <FormControl>
                    <Input
                      type='number'
                      disabled={!stakedBalance}
                      min={0}
                      step={0.01}
                      max={stakedBalanceNumber}
                      placeholder='cEUR amount'
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type='button'
                    variant='secondary'
                    size='sm'
                    onClick={() => {
                      form.setValue('amount', stakedBalanceNumber)
                    }}>
                    Max
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full mt-6' type='submit'>
              Withdraw
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
