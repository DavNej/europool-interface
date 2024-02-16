import Link from 'next/link'
import networkConfig from '@/lib/network.config'

export default function ExplorerLink({ txHash }: { txHash: string }) {
  return (
    <Link target='_blank' href={`${networkConfig.explorerUrl}/tx/${txHash}`}>
      View on Explorer
    </Link>
  )
}
