import { http, createConfig } from 'wagmi'
import { localhost, celoAlfajores } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [localhost, celoAlfajores],
  connectors: [injected()],
  transports: {
    [localhost.id]: http(),
    [celoAlfajores.id]: http(),
  },
})
