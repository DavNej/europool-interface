import { useReadContract, useWriteContract } from 'wagmi'
import erc20Abi from '@/lib/abis/erc20'
import { useNetworkConfig } from '@/lib/network-config'
import type { Address } from 'viem'
import { toast } from '@/components/ui/use-toast'
import ExplorerLink from '@/components/explorer-link'

/**
 * ERC20 reads
 */
export function useGetTokenBalance({
  address,
}: {
  address: Address | undefined
}) {
  const networkConfig = useNetworkConfig()

  return useReadContract({
    abi: erc20Abi,
    address: networkConfig.tokenAddress,
    functionName: 'balanceOf',
    args: [address || '0x'],
    query: { enabled: !!address },
  })
}

export function useGetTokenSymbol() {
  const networkConfig = useNetworkConfig()

  return useReadContract({
    abi: erc20Abi,
    address: networkConfig.tokenAddress,
    functionName: 'symbol',
  })
}

/**
 * ERC20 writes
 */
export function useApprove() {
  const networkConfig = useNetworkConfig()
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
        abi: erc20Abi,
        address: networkConfig.tokenAddress,
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
