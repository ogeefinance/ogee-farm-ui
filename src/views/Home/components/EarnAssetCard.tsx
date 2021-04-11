import React from 'react'
import styled from 'styled-components'
import orderBy from 'lodash/orderBy'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon } from '@ogeefinance/uikit'
import { NavLink } from 'react-router-dom'
import pools from 'config/constants/pools'
import { Pool } from 'state/types'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/pools-bg.svg');
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
const EarnAssetCard = () => {
  const activeNonOytPools = pools.filter((pool) => !pool.isFinished && !pool.tokenName.includes('OYT'))
  const latestPools: Pool[] = orderBy(activeNonOytPools, ['sortOrder', 'pid'], ['desc', 'desc']).slice(0, 3)
  // Always include OYT
  const assets = ['OYT', ...latestPools.map((pool) => pool.tokenName)].join(', ')

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" size="lg">
          Earn
        </Heading>
        <CardMidContent color="primary">{assets}</CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" size="lg">
            in Pools
          </Heading>
          <NavLink exact activeClassName="active" to="/pools" id="pool-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAssetCard
