import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    ogeeId: 0,
    tokenName: 'OYT',
    tokenAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    stakingTokenName: QuoteToken.OYT,
    stakingTokenAddress: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    contractAddress: {
      128: '0xd3af5fe61dbaf8f73149bfcfa9fb653ff096029a',
      256: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    projectLink: 'https://ogeeYieldswap.finance/',
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
    tokenDecimals: 18,
  },
]

export default pools
