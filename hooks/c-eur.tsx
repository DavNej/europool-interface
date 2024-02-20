import { useReadContract, useWriteContract } from 'wagmi'
import erc20Abi from '@/lib/abis/erc20'
import networkConfig from '@/lib/network.config'
import type { Address } from 'viem'
import { toast } from '@/components/ui/use-toast'
import ExplorerLink from '@/components/explorer-link'

const contractConfig = {
  abi: erc20Abi,
  address: networkConfig.cEuroAddress,
}

/**
 * cEur reads
 */
export function useGetCEurBalance({
  address,
}: {
  address: Address | undefined
}) {
  return useReadContract({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [address || '0x'],
    query: { enabled: !!address, initialData: BigInt(0) },
  })
}

/**
 * cEur writes
 */
export function useApprove() {
  const mutation = useWriteContract()

  async function approve({
    address,
    amount,
  }: {
    address: Address
    amount: bigint
  }) {
    mutation.writeContract(
      {
        ...contractConfig,
        functionName: 'approve',
        args: [address, amount],
      },
      {
        onSuccess: txHash => {
          toast({
            title: 'Approval Successful',
            description: (
              <>
                <ExplorerLink txHash={txHash} />. Waiting for transaction&apos;s
                success...
              </>
            ),
          })
        },
      }
    )
  }

  return { ...mutation, approve }
}
