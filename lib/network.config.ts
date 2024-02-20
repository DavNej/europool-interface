import type { Chain, Address } from 'viem'
import { localhost, celoAlfajores } from 'wagmi/chains'

interface NetworkConfig {
  euroPoolAddress: Address
  cEuroAddress: Address
  explorerUrl?: string
  chains: readonly [Chain, ...Chain[]]
}

const LOCALHOST_EUROPOOL_ADDRESS = '0x59b670e9fA9D0A427751Af201D676719a970857b'
const LOCALHOST_C_EURO_ADDRESS = '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d'

const ALFAJORES_EUROPOOL_ADDRESS = '0xb45Fa036d3E90c9900397D1F0EcaBE65A6967C93'
const ALFAJORES_C_EURO_ADDRESS = '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F'

// @ts-ignore
localhost.id = 31_337

export const localhostNetworkConfig: NetworkConfig = {
  euroPoolAddress: LOCALHOST_EUROPOOL_ADDRESS,
  cEuroAddress: LOCALHOST_C_EURO_ADDRESS,
  chains: [localhost],
}

export const celoAlfajoresNetworkConfig: NetworkConfig = {
  euroPoolAddress: ALFAJORES_EUROPOOL_ADDRESS,
  cEuroAddress: ALFAJORES_C_EURO_ADDRESS,
  explorerUrl: 'https://alfajores.celoscan.io/',
  chains: [celoAlfajores],
}

const config =
  process.env.NODE_ENV === 'development'
    ? localhostNetworkConfig
    : celoAlfajoresNetworkConfig

export default config
