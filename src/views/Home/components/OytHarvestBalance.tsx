import React from 'react'
import { Text } from '@ogeefinance/uikit'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import useI18n from 'hooks/useI18n'
import useAllEarnings from 'hooks/useAllEarnings'
import { usePriceOytHusd } from 'state/hooks'
import styled from 'styled-components'
import CardValue from './CardValue'
import CardHusdValue from './CardHusdValue'

const Block = styled.div`
  margin-bottom: 24px;
}
`

const OytHarvestBalance = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const earningsHusd = new BigNumber(earningsSum).multipliedBy(usePriceOytHusd()).toNumber()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '76px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <Block>
      <CardValue value={earningsSum} lineHeight="1.5" />
      <CardHusdValue value={earningsHusd} />
    </Block>
  )
}

export default OytHarvestBalance
