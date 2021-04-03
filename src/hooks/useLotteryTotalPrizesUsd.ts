import { usePriceOytHusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalOyt = getBalanceNumber(totalRewards)
  const oytPriceHusd = usePriceOytHusd()

  return totalOyt * oytPriceHusd.toNumber()
}

export default useLotteryTotalPrizesUsd
