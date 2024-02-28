'use client'

import TanstackQueryProvider from './tanstack-query'
import RainbowProvider from './rainbow-kit'
import { NetworkConfigProvider } from '@/lib/network-config'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <RainbowProvider>
        <NetworkConfigProvider>{children}</NetworkConfigProvider>
      </RainbowProvider>
    </TanstackQueryProvider>
  )
}
