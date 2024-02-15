'use client'

import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi.config'
import TanstackQueryProvider from './tanstack-query'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <TanstackQueryProvider>{children}</TanstackQueryProvider>
    </WagmiProvider>
  )
}
