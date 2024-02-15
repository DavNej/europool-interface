'use client'

import * as React from 'react'
import { useConnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useAccount, useDisconnect } from 'wagmi'
import { useToast } from '@/components/ui/use-toast'

export default function HomeTemplate({ children }: React.PropsWithChildren) {
  const { connectors, connect } = useConnect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()
  const injected = connectors.find(connector => connector.id === 'injected')

  return (
    <main className='flex flex-col min-h-screen bg-slate-100'>
      <nav className='flex p-4 gap-4 items-center justify-between bg-white'>
        <p className='flex flex-col'>
          <span className='text-lg font-bold'>EuroPool</span>
          <span className='text-xs font-extralight'>
            a simple staking service
          </span>
        </p>

        <Button
          onClick={() => {
            if (isConnected) {
              disconnect()
              return
            }
            if (injected) {
              connect({ connector: injected })
            }

            toast({
              title: 'No wallet detected',
              description: 'Please install Metamask or another Ethereum wallet',
              variant: 'destructive',
            })
          }}>
          {isConnected ? 'Disconnect' : 'Connect wallet'}
        </Button>
      </nav>
      <div className='flex-1 flex flex-col p-24 place-items-center gap-8'>
        {isConnected ? (
          children
        ) : (
          <p className='m-auto text-xs font-light'>
            Please connect your wallet to continue
          </p>
        )}
      </div>
      <footer className='p-4 text-sm text-center font-light'>
        Remember! Not your key not your crypto
      </footer>
    </main>
  )
}
