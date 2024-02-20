'use client'

import React from 'react'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useToast } from '@/components/ui/use-toast'

export default function TanstackQueryProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { toast } = useToast()

  function onError(err: unknown) {
    const isTypeError = err instanceof Error && err.message
    console.error('💥', err)
    toast({
      title: 'Fetching error 💥',
      description: isTypeError ? err.message : 'Something went wrong',
      variant: 'destructive',
    })
  }

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({ onError }),
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 6 * 1000,
            // refetchInterval: 6 * 1000,
          },
          mutations: { onError },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
