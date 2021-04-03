import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import web3NoAccount from 'utils/web3'
import { poolsConfig } from 'config/constants'
import { PoolCategory } from 'config/constants/types'

// Addresses
import {
  getAddress,
  getOgeeYieldProfileAddress,
  getOgeeYieldRabbitsAddress,
  getBunnyFactoryAddress,
  getBunnySpecialAddress,
  getOytAddress,
  getLotteryAddress,
  getLotteryTicketAddress,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'config/abi/ogeeYieldProfile.json'
import ogeeYieldRabbitsAbi from 'config/abi/ogeeYieldRabbits.json'
import bunnyFactoryAbi from 'config/abi/bunnyFactory.json'
import bunnySpecialAbi from 'config/abi/bunnySpecial.json'
import bep20Abi from 'config/abi/erc20.json'
import oytAbi from 'config/abi/oyt.json'
import ifoAbi from 'config/abi/ifo.json'
import pointCenterIfo from 'config/abi/pointCenterIfo.json'
import lotteryAbi from 'config/abi/lottery.json'
import lotteryTicketAbi from 'config/abi/lotteryNft.json'
import masterChef from 'config/abi/masterchef.json'
import ogeeChef from 'config/abi/ogeeChef.json'
import ogeeChefHt from 'config/abi/ogeeChefHt.json'
import claimRefundAbi from 'config/abi/claimRefund.json'

const getContract = (abi: any, address: string, web3?: Web3) => {
  const _web3 = web3 ?? web3NoAccount
  return new _web3.eth.Contract((abi as unknown) as AbiItem, address)
}

export const getBep20Contract = (address: string, web3?: Web3) => {
  return getContract(bep20Abi, address, web3)
}
export const getIfoContract = (address: string, web3?: Web3) => {
  return getContract(ifoAbi, address, web3)
}
export const getOgeechefContract = (id: number, web3?: Web3) => {
  const config = poolsConfig.find((pool) => pool.ogeeId === id)
  const abi = config.poolCategory === PoolCategory.BINANCE ? ogeeChefHt : ogeeChef
  return getContract(abi, getAddress(config.contractAddress), web3)
}
export const getPointCenterIfoContract = (web3?: Web3) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), web3)
}
export const getOytContract = (web3?: Web3) => {
  return getContract(oytAbi, getOytAddress(), web3)
}
export const getProfileContract = (web3?: Web3) => {
  return getContract(profileABI, getOgeeYieldProfileAddress(), web3)
}
export const getOgeeYieldRabbitContract = (web3?: Web3) => {
  return getContract(ogeeYieldRabbitsAbi, getOgeeYieldRabbitsAddress(), web3)
}
export const getBunnyFactoryContract = (web3?: Web3) => {
  return getContract(bunnyFactoryAbi, getBunnyFactoryAddress(), web3)
}
export const getBunnySpecialContract = (web3?: Web3) => {
  return getContract(bunnySpecialAbi, getBunnySpecialAddress(), web3)
}
export const getLotteryContract = (web3?: Web3) => {
  return getContract(lotteryAbi, getLotteryAddress(), web3)
}
export const getLotteryTicketContract = (web3?: Web3) => {
  return getContract(lotteryTicketAbi, getLotteryTicketAddress(), web3)
}
export const getMasterchefContract = (web3?: Web3) => {
  return getContract(masterChef, getMasterChefAddress(), web3)
}
export const getClaimRefundContract = (web3?: Web3) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), web3)
}
