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

export function useGetDepositedBalance({
  address,
}: {
  address: Address | undefined
}) {
  return useReadContract({
    ...contractConfig,
    functionName: 'getStaked',
    args: [address || '0x'],
  })
}

export function useStake() {
  const { approve } = useApprove()

  const mutation = useWriteContract()

  function stake({ amount }: { amount: bigint }) {
    approve({
      address: networkConfig.euroPoolAddress,
      amount,
    })

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
