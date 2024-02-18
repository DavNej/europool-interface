'use client'

import TanstackQueryProvider from './tanstack-query'
import RainbowProvider from './rainbow-kit'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <RainbowProvider>{children}</RainbowProvider>
    </TanstackQueryProvider>
  )
}
