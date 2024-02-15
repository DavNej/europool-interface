'use client'

import * as React from 'react'
import { useConnect } from 'wagmi'
import { Button } from '@/components/ui/button'
import { useAccount, useDisconnect } from 'wagmi'
import { useToast } from '@/components/ui/use-toast'

export default function Home() {
  const { connectors, connect } = useConnect()
  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()
  const injected = connectors.find(connector => connector.id === 'injected')

  return (
    <main className='flex flex-col min-h-screen p-24 place-items-center gap-8'>
      <p>Welcome to EuroPool, a simple staking service.</p>

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
    </main>
  )
}
