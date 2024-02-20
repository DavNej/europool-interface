import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import type { Address } from 'viem'
import europoolAbi from '@/lib/abis/europool'
import networkConfig from '@/lib/network.config'
import { useApprove } from './c-eur'
import { toast } from '@/components/ui/use-toast'
import ExplorerLink from '@/components/explorer-link'
import React from 'react'

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
    query: { enabled: !!address },
  })
}

export function useGetTotalStaked() {
  return useReadContract({
    ...contractConfig,
    functionName: 'getTotalStaked',
  })
}

export function useGetRewardsOf({ address }: { address: Address | undefined }) {
  return useReadContract({
    ...contractConfig,
    functionName: 'getRewardsOf',
    args: [address || '0x'],
    query: { enabled: !!address },
  })
}

/**
 * EuroPool writes
 */
export function useStake() {
  const amountRef = React.useRef(BigInt(0))

  const mutation = useWriteContract()
  const { approve, data } = useApprove()

  const result = useWaitForTransactionReceipt({
    hash: data,
    query: { enabled: !!data },
  })

  React.useEffect(() => {
    if (result.isSuccess && mutation.isIdle && amountRef.current > BigInt(0)) {
      mutation.writeContract(
        {
          ...contractConfig,
          functionName: 'stake',
          args: [amountRef.current],
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
    }
  }, [mutation, result.isSuccess])

  function stake({ amount }: { amount: bigint }) {
    amountRef.current = amount
    approve({
      address: networkConfig.euroPoolAddress,
      amount: amountRef.current,
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
