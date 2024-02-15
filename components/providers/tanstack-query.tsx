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
    toast({
      title: 'Oops!',
      description: isTypeError ? err.message : 'Something went wrong',
      variant: 'destructive',
    })
  }

  const _queryClient = new QueryClient({
    queryCache: new QueryCache({ onError }),
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
      mutations: { onError },
    },
  })

  const [queryClient] = React.useState(_queryClient)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
