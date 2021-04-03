import { AbiItem } from 'web3-utils'
import poolsConfig from 'config/constants/pools'
import masterChefABI from 'config/abi/masterchef.json'
import ogeeChefABI from 'config/abi/ogeeChef.json'
import erc20ABI from 'config/abi/erc20.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { getWeb3NoAccount } from 'utils/web3'
import BigNumber from 'bignumber.js'

// Pool 0, Oyt / Oyt is a different kind of contract (master chef)
// HT pools use the native HT token (wrapping ? unwrapping is done at the contract level)
const nonHtPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.HT)
const htPools = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.HT)
const nonMasterPools = poolsConfig.filter((p) => p.ogeeId !== 0)
const web3 = getWeb3NoAccount()
const masterChefContract = new web3.eth.Contract((masterChefABI as unknown) as AbiItem, getMasterChefAddress())

export const fetchPoolsAllowance = async (account) => {
  const calls = nonHtPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'allowance',
    params: [account, getAddress(p.contractAddress)],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return nonHtPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.ogeeId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non HT pools
  const calls = nonHtPools.map((p) => ({
    address: p.stakingTokenAddress,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = nonHtPools.reduce(
    (acc, pool, index) => ({ ...acc, [pool.ogeeId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  // HT pools
  const htBalance = await web3.eth.getBalance(account)
  const htBalances = htPools.reduce(
    (acc, pool) => ({ ...acc, [pool.ogeeId]: new BigNumber(htBalance).toJSON() }),
    {},
  )

  return { ...tokenBalances, ...htBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(ogeeChefABI, calls)
  const stakedBalances = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.ogeeId]: new BigNumber(userInfo[index].amount._hex).toJSON(),
    }),
    {},
  )

  // Oyt / Oyt pool
  const { amount: masterPoolAmount } = await masterChefContract.methods.userInfo('0', account).call()

  return { ...stakedBalances, 0: new BigNumber(masterPoolAmount).toJSON() }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = nonMasterPools.map((p) => ({
    address: getAddress(p.contractAddress),
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(ogeeChefABI, calls)
  const pendingRewards = nonMasterPools.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.ogeeId]: new BigNumber(res[index]).toJSON(),
    }),
    {},
  )

  // Oyt / Oyt pool
  const pendingReward = await masterChefContract.methods.pendingOyt('0', account).call()

  return { ...pendingRewards, 0: new BigNumber(pendingReward).toJSON() }
}
