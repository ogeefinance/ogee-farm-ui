import React, { useCallback, useRef } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@ogeefinance/uikit'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { QuoteToken } from 'config/constants/types'
import { useFarms, usePriceHtHusd } from 'state/hooks'
import { BLOCKS_PER_YEAR, OYT_PER_BLOCK, OYT_POOL_PID } from 'config'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/apy-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 146px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const htPrice = usePriceHtHusd()

  const maxAPY = useRef(Number.MIN_VALUE)

  const getHighestAPY = () => {
    const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')

    calculateAPY(activeFarms)

    return (maxAPY.current * 100).toLocaleString('en-US').slice(0, -1)
  }

  const calculateAPY = useCallback(
    (farmsToDisplay) => {
      const oytPriceVsHT = new BigNumber(farmsLP.find((farm) => farm.pid === OYT_POOL_PID)?.tokenPriceVsQuote || 0)

      farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const oytRewardPerBlock = OYT_PER_BLOCK.times(farm.poolWeight)
        const oytRewardPerYear = oytRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = oytPriceVsHT.times(oytRewardPerYear).div(farm.lpTotalInQuoteToken)

        if (farm.quoteTokenSymbol === QuoteToken.HUSD) {
          apy = oytPriceVsHT.times(oytRewardPerYear).div(farm.lpTotalInQuoteToken).times(htPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.OYT) {
          apy = oytRewardPerYear.div(farm.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const oytApy =
            farm && oytPriceVsHT.times(oytRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
          const dualApy =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apy = oytApy && dualApy && oytApy.plus(dualApy)
        }

        if (maxAPY.current < apy.toNumber()) maxAPY.current = apy.toNumber()

        return apy
      })
    },
    [htPrice, farmsLP],
  )

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Earn up to
        </Heading>
        <CardMidContent color="#6666F5">
          {getHighestAPY() ? (
            `${getHighestAPY()}% ${TranslateString(736, 'APR')}`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in Farms
          </Heading>
          <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
