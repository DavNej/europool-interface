import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatEther } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBigint(data: bigint | undefined, decimals = 2) {
  if(!data)
    return (0).toFixed(decimals)

  return parseFloat(formatEther(data)).toFixed(decimals)
}
