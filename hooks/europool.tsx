import { useReadContract, useWriteContract } from 'wagmi'
import type { Address } from 'viem'
import europoolAbi from '@/lib/abis/europool'
import networkConfig from '@/lib/network.config'
import { useApprove } from './c-eur'
import { toast } from '@/components/ui/use-toast'
import ExplorerLink from '@/components/explorer-link'

const contractConfig = {
  abi: europoolAbi,
  address: networkConfig.euroPoolAddress,
}

/**
 * EuroPool reads
 */
export function useGetStakedBalanceOf({
  address,
}: {
  address: Address | undefined
}) {
  return useReadContract({
    ...contractConfig,
    functionName: 'getStakedBalanceOf',
    args: [address || '0x'],
    query: { enabled: !!address, initialData: BigInt(0) },
  })
}

export function useGetRewardsOf({ address }: { address: Address | undefined }) {
  return useReadContract({
    ...contractConfig,
    functionName: 'getRewardsOf',
    args: [address || '0x'],
    query: { enabled: !!address, initialData: BigInt(0) },
  })
}

/**
 * EuroPool writes
 */
export function useStake() {
  const mutation = useWriteContract()
  const { approve } = useApprove({
    onSuccess: amount => {
      mutation.writeContract(
        {
          ...contractConfig,
          functionName: 'stake',
          args: [amount],
        },
        {
          onSuccess: txHash => {
            toast({
              title: 'Deposit Successful',
              description: (
                <>
                  <p>You have successfully deposited your funds</p>
                  <ExplorerLink txHash={txHash} />
                </>
              ),
            })
          },
        }
      )
    },
  })

  function stake({ amount }: { amount: bigint }) {
    approve({
      address: networkConfig.euroPoolAddress,
      amount,
    })
  }

  return { ...mutation, stake }
}

export function useWithdraw() {
  const mutation = useWriteContract()

  function withdraw({ amount }: { amount: bigint }) {
    mutation.writeContract(
      {
        ...contractConfig,
        functionName: 'withdraw',
        args: [amount],
      },
      {
        onSuccess: txHash => {
          toast({
            title: 'Withdrawal Successful',
            description: (
              <>
                <p>You have successfully withdrawn your funds</p>
                <ExplorerLink txHash={txHash} />
              </>
            ),
          })
        },
      }
    )
  }

  return { ...mutation, withdraw }
}

export function useClaimReward() {
  const mutation = useWriteContract()

  function claimReward() {
    mutation.writeContract(
      {
        ...contractConfig,
        functionName: 'claimReward',
      },
      {
        onSuccess: txHash => {
          toast({
            title: 'Rewards Successfully Claimed',
            description: (
              <>
                <p>You have successfully claimed your rewards</p>
                <ExplorerLink txHash={txHash} />
              </>
            ),
          })
        },
      }
    )
  }

  return { ...mutation, claimReward }
}
