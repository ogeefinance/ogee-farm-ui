import React from 'react'
import { Card, CardBody, Heading, Text } from '@ogeefinance/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getOytAddress } from 'utils/addressHelpers'
import CardValue from './CardValue'
import { useFarms, usePriceOytHusd } from '../../../state/hooks'


const StyledOytStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const OytStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getOytAddress())
  const farms = useFarms()
  const oytPrice = usePriceOytHusd()
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0)
  const oytSupply = getBalanceNumber(circSupply)
  const marketCap = oytPrice.times(circSupply)


 const oytPerBlock = 0.1


  return (
    <StyledOytStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'OYT Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(10005, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Minted')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burnedBalance)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(10004, 'Circulating Supply')}</Text>
          {oytSupply && <CardValue fontSize="14px" value={oytSupply} decimals={0} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New OYT/block')}</Text>
          <Text bold fontSize="14px">
            {oytPerBlock}
          </Text>
        </Row>
      </CardBody>
    </StyledOytStats>
  )
}

export default OytStats
