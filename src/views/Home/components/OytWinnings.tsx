import React from 'react'
import { useTotalClaim } from 'hooks/useTickets'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceOytHusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardHusdValue from './CardHusdValue'

const Block = styled.div`
  margin-bottom: 24px;
 }
`
const OytWinnings = () => {
  const { claimAmount } = useTotalClaim()
  const oytAmount = getBalanceNumber(claimAmount)
  const claimAmountHusd = new BigNumber(oytAmount).multipliedBy(usePriceOytHusd()).toNumber()

  return (
    <Block>
      <CardValue value={oytAmount} lineHeight="1.5" />
      <CardHusdValue value={claimAmountHusd} decimals={2} />
    </Block>
  )
}

export default OytWinnings
