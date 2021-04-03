import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 3,
    lpSymbol: 'OYT',
    lpAddresses: {
      256: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      128: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    tokenSymbol: 'OGEE',
    tokenAddresses: {
      256: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      128: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 1,
    risk: 3,
    lpSymbol: 'OYT-HT LP',
    lpAddresses: {
      256: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      128: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    tokenSymbol: 'OYT',
    tokenAddresses: {
      256: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      128: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'HUSD-HT LP',
    lpAddresses: {
      256: '0x2f7682b64b88149ba3250aee32db712964de5fa9',
      128: '0x1b96b92314c44b159149f7e0303511fb2fc4774f',
    },
    tokenSymbol: 'HUSD',
    tokenAddresses: {
      256: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      128: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 14,
    risk: 3,
    lpSymbol: 'ETH-HT LP',
    lpAddresses: {
      256: '0xE66790075ad839978fEBa15D4d8bB2b415556a1D',
      128: '0x70D8929d04b60Af4fb9B58713eBcf18765aDE422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      256: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5',
      128: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
]

export default farms
