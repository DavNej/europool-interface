import type { Address } from 'viem'
import * as React from 'react'
import { useChainId } from 'wagmi'
import { localhost, celoAlfajores, sepolia, polygonMumbai } from 'wagmi/chains'
import { defaultChain } from '@/components/providers/rainbow-kit'

/**
 * Network Configs
 */

interface NetworkConfig {
  euroPoolAddress: Address
  tokenAddress: Address
  explorerUrl: string
}

export const networkConfigs: Record<number, NetworkConfig> = {
  [celoAlfajores.id]: {
    euroPoolAddress: '0x0DDEfCCC221781946EBb084dDe4fBC2D47EdC585',
    tokenAddress: '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F', // cEUR
    explorerUrl: 'https://alfajores.celoscan.io/',
  },
  [sepolia.id]: {
    euroPoolAddress: '0x6F1A5F49E15c90fcDb54157029063548Be2bE220',
    tokenAddress: '0x523C8591Fbe215B5aF0bEad65e65dF783A37BCBC', // USDT
    explorerUrl: 'https://sepolia.etherscan.io/',
  },
  [polygonMumbai.id]: {
    euroPoolAddress: '0x6F1A5F49E15c90fcDb54157029063548Be2bE220',
    tokenAddress: '0x6D8873f56a56f0Af376091beddDD149f3592e854', // DAI
    explorerUrl: 'https://mumbai.polygonscan.com/',
  },
  [localhost.id]: {
    euroPoolAddress: '0x59b670e9fA9D0A427751Af201D676719a970857b',
    tokenAddress: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
    explorerUrl: 'http://127.0.0.1/',
  },
}

/**
 * Context and hook to consume the network config
 */

const initialNetworkConfig = networkConfigs[defaultChain.id]

const NetworkConfigContext =
  React.createContext<NetworkConfig>(initialNetworkConfig)

export function NetworkConfigProvider(props: React.PropsWithChildren) {
  const chainId = useChainId()
  const [networkConfig, setNetworkConfig] = React.useState(initialNetworkConfig)

  React.useEffect(() => {
    if (!(chainId in networkConfigs)) {
      throw new Error(`Missing network config for chainId ${chainId}`)
    }

    setNetworkConfig(networkConfigs[chainId])
  }, [chainId])

  const value = React.useMemo(() => networkConfig, [networkConfig])

  return <NetworkConfigContext.Provider value={value} {...props} />
}

export function useNetworkConfig() {
  const context = React.useContext(NetworkConfigContext)
  if (!context) {
    throw new Error(
      'useNetworkConfig must be used within the NetworkConfigProvider'
    )
  }
  return context
}
