import React from 'react'
import { Text } from '@ogeefinance/uikit'
import { useWeb3React } from '@web3-react/core'
import useTokenBalance from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getOytAddress } from 'utils/addressHelpers'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceOytHusd } from 'state/hooks'
import { BigNumber } from 'bignumber.js'
import CardValue from './CardValue'
import CardHusdValue from './CardHusdValue'

const OytWalletBalance = () => {
  const TranslateString = useI18n()
  const oytBalance = useTokenBalance(getOytAddress())
  const husdBalance = new BigNumber(getBalanceNumber(oytBalance)).multipliedBy(usePriceOytHusd()).toNumber()
  const { account } = useWeb3React()

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '54px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    )
  }

  return (
    <>
      <CardValue value={getBalanceNumber(oytBalance)} decimals={4} fontSize="24px" lineHeight="36px" />
      <CardHusdValue value={husdBalance} />
    </>
  )
}

export default OytWalletBalance
