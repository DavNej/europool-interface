'use client'

import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <main className='flex flex-col min-h-screen p-24 place-items-center gap-8'>
      <p>Welcome to EuroPool, a simple staking service.</p>
      <Button
        onClick={() => {
          console.log('Button clicked')
        }}>
        Click me
      </Button>
    </main>
  )
}
