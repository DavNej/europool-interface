import { type Address } from 'viem'

interface NetworkConfig {
  euroPoolAddress: Address
  cEuroAddress: Address
  explorerUrl?: string
}

const LOCALHOST_EUROPOOL_ADDRESS = '0x59b670e9fA9D0A427751Af201D676719a970857b'
const LOCALHOST_C_EURO_ADDRESS = '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d'

const ALFAJORES_EUROPOOL_ADDRESS = '0x0000000000000000000000000000000000000000'
const ALFAJORES_C_EURO_ADDRESS = '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F'

export const localhostNetworkConfig: NetworkConfig = {
  euroPoolAddress: LOCALHOST_EUROPOOL_ADDRESS,
  cEuroAddress: LOCALHOST_C_EURO_ADDRESS,
}

export const celoAlfajoresNetworkConfig: NetworkConfig = {
  euroPoolAddress: ALFAJORES_EUROPOOL_ADDRESS,
  cEuroAddress: ALFAJORES_C_EURO_ADDRESS,
  explorerUrl: 'https://alfajores.celoscan.io/',
}

const config =
  process.env.NODE_ENV === 'development'
    ? localhostNetworkConfig
    : celoAlfajoresNetworkConfig

export default config
