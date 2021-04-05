import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 3,
    lpSymbol: 'OGE-HUSD LP',
    lpAddresses: {
      256: '',
      128: '0xA31fb834f59468a92FD488f66E53122C6ABFf039',
    },
    tokenSymbol: 'OGE',
    tokenAddresses: {
      256: '',
      128: '0x81c3BB76508BB4668fD38DDA71655972F4a3526F',
    },
    quoteTokenSymbol: QuoteToken.HUSD,
    quoteTokenAdresses: contracts.husd,
  },
  {
    pid: 1,
    risk: 3,
    lpSymbol: 'OGE-HT LP',
    lpAddresses: {
      256: '',
      128: '0x01fAB56252d5dBf036900E54674655BFCEC9530b',
    },
    tokenSymbol: 'OGE',
    tokenAddresses: {
      256: '',
      128: '0x81c3BB76508BB4668fD38DDA71655972F4a3526F',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 2,
    risk: 3,
    lpSymbol: 'OYT-HT LP',
    lpAddresses: {
      256: '',
      128: '0xd02C649E62E21F13fdD7F82b5c263D617f645606',
    },
    tokenSymbol: 'OYT',
    tokenAddresses: {
      256: '',
      128: '0xf7e522999cA7F1306D4df1B5eFcCFAB6A1eD99d6',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 3,
    risk: 3,
    lpSymbol: 'HT-USDT LP',
    lpAddresses: {
      256: '',
      128: '0xB047130ee15FC9daA457501fEa2A9a42f1C4d5c4',
    },
    tokenSymbol: 'HT',
    tokenAddresses: {
      256: '',
      128: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
    },
    quoteTokenSymbol: QuoteToken.USDT,
    quoteTokenAdresses: contracts.usdt,
  },
  {
    pid: 4,
    risk: 3,
    lpSymbol: 'HUSD-HT LP',
    lpAddresses: {
      256: '',
      128: '0x68C1cAD1067FC285D5DDe8910c8a5F186e002DC4',
    },
    tokenSymbol: 'HUSD',
    tokenAddresses: {
      256: '',
      128: '0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 5,
    risk: 3,
    lpSymbol: 'HT-USDC LP',
    lpAddresses: {
      256: '',
      128: '0x632637b8D16a7343F454f26960137EDf39cf413e',
    },
    tokenSymbol: 'HT',
    tokenAddresses: {
      256: '',
      128: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
    },
    quoteTokenSymbol: QuoteToken.USDC,
    quoteTokenAdresses: contracts.usdc,
  },
  {
    pid: 6,
    risk: 3,
    lpSymbol: 'OGE-USDT LP',
    lpAddresses: {
      256: '',
      128: '0x31193a6559F0E33D1A2BBe4413F1b98E7bff8170',
    },
    tokenSymbol: 'OGE',
    tokenAddresses: {
      256: '',
      128: '0x81c3BB76508BB4668fD38DDA71655972F4a3526F',
    },
    quoteTokenSymbol: QuoteToken.HT,
    quoteTokenAdresses: contracts.wht,
  },
  {
    pid: 7,
    risk: 3,
    lpSymbol: 'OGE Solo LP',
    isTokenOnly: true,
    lpAddresses: {
      256: '',
      128: '0x81c3BB76508BB4668fD38DDA71655972F4a3526F',
    },
    tokenSymbol: 'OGE',
    tokenAddresses: {
      256: '',
      128: '0x81c3BB76508BB4668fD38DDA71655972F4a3526F',
    },
    quoteTokenSymbol: QuoteToken.OGE,
    quoteTokenAdresses: contracts.oge,
  },
]

export default farms
