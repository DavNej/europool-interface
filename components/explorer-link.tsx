import Link from 'next/link'
import { useNetworkConfig } from '@/lib/network-config'

export default function ExplorerLink({ txHash }: { txHash: string }) {
  const { explorerUrl } = useNetworkConfig()

  if (!explorerUrl) {
    return null
  }

  return (
    <Link
      className='underline'
      target='_blank'
      href={`${explorerUrl}/tx/${txHash}`}>
      View on Explorer
    </Link>
  )
}
