import type { Metadata } from 'next'
import { Toaster } from '@/components/ui/toaster'
import Providers from '@/components/providers'

import './globals.css'

export const metadata: Metadata = {
  title: 'EuroPool',
  description: 'A simple staking service',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
