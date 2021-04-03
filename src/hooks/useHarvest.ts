import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useDispatch } from 'react-redux'
import { fetchFarmUserDataAsync, updateUserBalance, updateUserPendingReward } from 'state/actions'
import { ogeehHarvest, ogeehHarvestHt, harvest } from 'utils/callHelpers'
import { useMasterchef, useOgeeChef } from './useContract'

export const useHarvest = (farmPid: number) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const txHash = await harvest(masterChefContract, farmPid, account)
    dispatch(fetchFarmUserDataAsync(account))
    return txHash
  }, [account, dispatch, farmPid, masterChefContract])

  return { onReward: handleHarvest }
}

export const useAllHarvest = (farmPids: number[]) => {
  const { account } = useWeb3React()
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    const harvestPromises = farmPids.reduce((accum, pid) => {
      return [...accum, harvest(masterChefContract, pid, account)]
    }, [])

    return Promise.all(harvestPromises)
  }, [account, farmPids, masterChefContract])

  return { onReward: handleHarvest }
}

export const useOgeeHarvest = (ogeeId, isUsingHt = false) => {
  const dispatch = useDispatch()
  const { account } = useWeb3React()
  const ogeeChefContract = useOgeeChef(ogeeId)
  const masterChefContract = useMasterchef()

  const handleHarvest = useCallback(async () => {
    if (ogeeId === 0) {
      await harvest(masterChefContract, 0, account)
    } else if (isUsingHt) {
      await ogeehHarvestHt(ogeeChefContract, account)
    } else {
      await ogeehHarvest(ogeeChefContract, account)
    }
    dispatch(updateUserPendingReward(ogeeId, account))
    dispatch(updateUserBalance(ogeeId, account))
  }, [account, dispatch, isUsingHt, masterChefContract, ogeeChefContract, ogeeId])

  return { onReward: handleHarvest }
}
