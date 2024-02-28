import React from 'react'
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import type { Address } from 'viem'
import europoolAbi from '@/lib/abis/europool'
import { useNetworkConfig } from '@/lib/network-config'
import { toast } from '@/components/ui/use-toast'
import ExplorerLink from '@/components/explorer-link'
import { useApprove } from './erc20'

/**
 * EuroPool reads
 */
export function useGetStakedBalanceOf({
  address,
}: {
  address: Address | undefined
}) {
  const networkConfig = useNetworkConfig()

  return useReadContract({
    abi: europoolAbi,
    address: networkConfig.euroPoolAddress,
    functionName: 'getStakedBalanceOf',
    args: [address || '0x'],
    query: { enabled: !!address },
  })
}

export function useGetTotalStaked() {
  const networkConfig = useNetworkConfig()

  return useReadContract({
    abi: europoolAbi,
    address: networkConfig.euroPoolAddress,
    functionName: 'getTotalStaked',
  })
}

export function useGetRewardsOf({ address }: { address: Address | undefined }) {
  const networkConfig = useNetworkConfig()

  return useReadContract({
    abi: europoolAbi,
    address: networkConfig.euroPoolAddress,
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

  const networkConfig = useNetworkConfig()
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
          abi: europoolAbi,
          address: networkConfig.euroPoolAddress,
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
  }, [mutation, networkConfig.euroPoolAddress, result.isSuccess])

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
  const networkConfig = useNetworkConfig()
  const mutation = useWriteContract()

  function withdraw({ amount }: { amount: bigint }) {
    mutation.writeContract(
      {
        abi: europoolAbi,
        address: networkConfig.euroPoolAddress,
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
  const networkConfig = useNetworkConfig()
  const mutation = useWriteContract()

  function claimReward() {
    mutation.writeContract(
      {
        abi: europoolAbi,
        address: networkConfig.euroPoolAddress,
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
