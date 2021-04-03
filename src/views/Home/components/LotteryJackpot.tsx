import React from 'react'
import { Text } from '@ogeefinance/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'
import useI18n from 'hooks/useI18n'
import { usePriceOytHusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardHusdValue from './CardHusdValue'

const LotteryJackpot = () => {
  const TranslateString = useI18n()
  const lotteryPrizeAmount = useTotalRewards()
  const balance = getBalanceNumber(lotteryPrizeAmount)
  const lotteryPrizeAmoutOyt = balance.toLocaleString(undefined, {
    maximumFractionDigits: 2,
  })
  const lotteryPrizeAmountHusd = new BigNumber(balance).multipliedBy(usePriceOytHusd()).toNumber()

  return (
    <>
      <Text bold fontSize="24px" style={{ lineHeight: '1.5' }}>
        {lotteryPrizeAmoutOyt} {TranslateString(999, 'OYT')}
      </Text>
      <CardHusdValue value={lotteryPrizeAmountHusd} />
    </>
  )
}

export default LotteryJackpot
