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

export default function DepositCard() {
  const { address } = useAccount()
  const { data: cEurBalance } = useGetCEurBalance({ address })
  const { stake } = useStake()

  const cEurBalanceNumber = Number(formatBigint(cEurBalance))

  const formSchema = z.object({
    amount: z.coerce.number().step(0.01).min(0).max(cEurBalanceNumber),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { amount: 0 },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    stake({ amount: parseEther(values.amount.toString()) })
  }

  return (
    <Card>
      <CardHeader className='space-y-6'>
        <CardTitle>Make a deposit</CardTitle>
        <CardDescription>
          Only cEUR can be deposited to EuroPool
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
                      disabled={!cEurBalance}
                      min={0}
                      step={0.01}
                      max={cEurBalanceNumber}
                      placeholder='cEUR amount'
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type='button'
                    variant='secondary'
                    size='sm'
                    onClick={() => {
                      form.setValue('amount', cEurBalanceNumber)
                    }}>
                    Max
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full mt-6' type='submit'>
              Deposit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
