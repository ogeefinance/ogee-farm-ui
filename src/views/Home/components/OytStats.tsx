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
import CardHusdValue from './CardHusdValue'


const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/stats-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const CardImage = styled.img`
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`


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
  const totalMcapHusd = new BigNumber(totalSupply).multipliedBy(usePriceOytHusd()).toNumber()
  const totalBurnedHusd = new BigNumber(burnedBalance).multipliedBy(usePriceOytHusd()).toNumber()


 const oytPerBlock = 0.1


  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'Ogee Yield Stats')}
        </Heading>
        <Block>
          <Label>{TranslateString(10005, 'Market Cap')}:</Label>
          <CardValue fontSize="24px" value={getBalanceNumber(marketCap)} decimals={0} prefix="$" />
        </Block>
        <Block>
          <Label>{TranslateString(536, 'Total Minted')}:</Label>
          {totalSupply && <CardValue fontSize="24px" value={getBalanceNumber(totalSupply)} decimals={0} />}
          <CardHusdValue value={totalMcapHusd} />
        </Block>
        <Block>
          <Label>{TranslateString(536, 'Total Burned')}:</Label>
          <CardValue fontSize="24px" value={getBalanceNumber(burnedBalance)} decimals={0} />
          <CardHusdValue value={totalBurnedHusd} />
        </Block>
        <Block>
          <Label>{TranslateString(10004, 'Circulating Supply')}:</Label>
          {oytSupply && <CardValue fontSize="24px" value={oytSupply} decimals={0} />}
        </Block>
        <Block>
          <Label>{TranslateString(540, 'New OYT/block')}:</Label>
          <Text bold fontSize="24px">
            {oytPerBlock}
          </Text>
        </Block>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default OytStats
