import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import networkConfig from '@/lib/network.config'

import '@rainbow-me/rainbowkit/styles.css'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_PROJECT_ID')
}

const config = getDefaultConfig({
  appName: 'EuroPool',
  projectId,
  chains: networkConfig.chains,
  ssr: true,
})

export default function RainbowProvider({ children }: React.PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider
        modalSize='compact'
        initialChain={networkConfig.chains[0]}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
