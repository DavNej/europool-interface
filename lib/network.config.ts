import { type Address } from 'viem'
import { localhost, celoAlfajores, type Chain } from 'viem/chains'

interface NetworkConfig {
  chain: Chain
  chainId: number
  euroPoolAddress: Address
  cEuroAddress: Address
}

const LOCALHOST_EUROPOOL_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3'
const LOCALHOST_C_EURO_ADDRESS = '0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496'
const ALFAJORES_EUROPOOL_ADDRESS = '0x0000000000000000000000000000000000000000'
const ALFAJORES_C_EURO_ADDRESS = '0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F'

export const localhostNetworkConfig: NetworkConfig = {
  chain: localhost,
  chainId: localhost.id,
  euroPoolAddress: LOCALHOST_EUROPOOL_ADDRESS,
  cEuroAddress: LOCALHOST_C_EURO_ADDRESS,
}

export const celoAlfajoresNetworkConfig: NetworkConfig = {
  chain: celoAlfajores,
  chainId: celoAlfajores.id,
  euroPoolAddress: ALFAJORES_EUROPOOL_ADDRESS,
  cEuroAddress: ALFAJORES_C_EURO_ADDRESS,
}

const config =
  process.env.NODE_ENV === 'development'
    ? localhostNetworkConfig
    : celoAlfajoresNetworkConfig

export default config
