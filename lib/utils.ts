import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { formatEther } from 'viem'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatBigint(data: bigint, decimals = 2) {
  return parseFloat(formatEther(data)).toFixed(decimals)
}
