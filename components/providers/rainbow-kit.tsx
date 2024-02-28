import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { Chain } from 'viem'
import { WagmiProvider } from 'wagmi'
import { localhost, celoAlfajores, sepolia, polygonMumbai } from 'wagmi/chains'

import '@rainbow-me/rainbowkit/styles.css'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_PROJECT_ID')
}

const prodChains: readonly [Chain, ...Chain[]] = [
  sepolia,
  polygonMumbai,
  celoAlfajores,
]

const chains: readonly [Chain, ...Chain[]] =
  process.env.NODE_ENV === 'development'
    ? [localhost, ...prodChains]
    : prodChains

const config = getDefaultConfig({
  appName: 'EuroPool',
  projectId,
  chains,
  ssr: true,
})

export const defaultChain = chains[0]

export default function RainbowProvider({ children }: React.PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <RainbowKitProvider modalSize='compact' initialChain={defaultChain}>
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
