import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, ogeeUnstake, ogeeEmegencyUnstake } from 'utils/callHelpers'
import { useMasterchef, useOgeeChef } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

const OGEEIDS = [5, 6, 3, 1, 22, 23]

export const useOgeeUnstake = (ogeeId) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const ogeeChefContract = useOgeeChef(ogeeId)
  const isOldOgee = OGEEIDS.includes(ogeeId)

  const handleUnstake = useCallback(
    async (amount: string, decimals: number) => {
      if (ogeeId === 0) {
        const txHash = await unstake(masterChefContract, 0, amount, account)
        console.info(txHash)
      } else if (isOldOgee) {
        const txHash = await ogeeEmegencyUnstake(ogeeChefContract, amount, account)
        console.info(txHash)
      } else {
        const txHash = await ogeeUnstake(ogeeChefContract, amount, decimals, account)
        console.info(txHash)
      }
      dispatch(updateUserStakedBalance(ogeeId, account))
      dispatch(updateUserBalance(ogeeId, account))
      dispatch(updateUserPendingReward(ogeeId, account))
    },
    [account, dispatch, isOldOgee, masterChefContract, ogeeChefContract, ogeeId],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
