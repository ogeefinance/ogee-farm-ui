import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserStakedBalance, updateUserBalance } from 'state/actions'
import { stake, ogeeStake, ogeeStakeHt } from 'utils/callHelpers'
import { useMasterchef, useOgeeChef } from './useContract'

const useStake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onStake: handleStake }
}

export const useOgeeStake = (ogeeId, isUsingHt = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()
  const ogeeChefContract = useOgeeChef(ogeeId)

  const handleStake = useCallback(
    async (amount: string, decimals: number) => {
      if (ogeeId === 0) {
        await stake(masterChefContract, 0, amount, account)
      } else if (isUsingHt) {
        await ogeeStakeHt(ogeeChefContract, amount, account)
      } else {
        await ogeeStake(ogeeChefContract, amount, decimals, account)
      }
      dispatch(updateUserStakedBalance(ogeeId, account))
      dispatch(updateUserBalance(ogeeId, account))
    },
    [account, dispatch, isUsingHt, masterChefContract, ogeeChefContract, ogeeId],
  )

  return { onStake: handleStake }
}

export default useStake
