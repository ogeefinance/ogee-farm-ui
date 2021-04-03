import BigNumber from 'bignumber.js'
import { getOytAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's OYT balance is at least the amount passed in
 */
const useHasOytBalance = (minimumBalance: BigNumber) => {
  const oytBalance = useTokenBalance(getOytAddress())
  return oytBalance.gte(minimumBalance)
}

export default useHasOytBalance
