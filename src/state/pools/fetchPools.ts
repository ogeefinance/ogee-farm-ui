import poolsConfig from 'config/constants/pools'
import ogeeChefABI from 'config/abi/ogeeChef.json'
import oytABI from 'config/abi/oyt.json'
import whtABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getAddress, getWhtAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.ogeeId !== 0)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: getAddress(poolConfig.contractAddress),
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(ogeeChefABI, callsStartBlock)
  const ends = await multicall(ogeeChefABI, callsEndBlock)

  return poolsWithEnd.map((oytPoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      ogeeId: oytPoolConfig.ogeeId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsTotalStatking = async () => {
  const nonHtPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.HT)
  const htPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.HT)

  const callsNonHtPools = nonHtPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const callsHtPools = htPool.map((poolConfig) => {
    return {
      address: getWhtAddress(),
      name: 'balanceOf',
      params: [getAddress(poolConfig.contractAddress)],
    }
  })

  const nonHtPoolsTotalStaked = await multicall(oytABI, callsNonHtPools)
  const htPoolsTotalStaked = await multicall(whtABI, callsHtPools)

  return [
    ...nonHtPools.map((p, index) => ({
      ogeeId: p.ogeeId,
      totalStaked: new BigNumber(nonHtPoolsTotalStaked[index]).toJSON(),
    })),
    ...htPool.map((p, index) => ({
      ogeeId: p.ogeeId,
      totalStaked: new BigNumber(htPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
