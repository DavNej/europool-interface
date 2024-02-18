'use client'

import * as React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function HomeTemplate({ children }: React.PropsWithChildren) {
  return (
    <main className='flex flex-col min-h-screen bg-slate-100'>
      <nav className='flex p-4 gap-4 items-center justify-between bg-white'>
        <div className='flex gap-2'>
          <Avatar className='mt-1'>
            <AvatarImage src='/logo.png' />
            <AvatarFallback>EP</AvatarFallback>
          </Avatar>

          <div className='flex flex-col'>
            <span className='text-lg font-bold'>EuroPool</span>
            <span className='text-xs font-extralight'>
              a simple staking service
            </span>
          </div>
        </div>
        <ConnectButton />
      </nav>
      <div className='flex-1 flex flex-col p-24 place-items-center gap-8'>
        {children}
      </div>
      <footer className='p-4 text-sm text-center font-light'>
        Remember! Not your key not your crypto
      </footer>
    </main>
  )
}
