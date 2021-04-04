import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@ogeefinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import OytStats from 'views/Home/components/OytStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import Farms from 'views/Home/components/Farms'
import TwitterCard from 'views/Home/components/TwitterCard'


const Hero = styled.div`
  align-items: center;
  background-image: url('/images/ogee-bg-mobile.svg');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/ogee-bg.svg'), url('/images/ogee-bg2.svg');
    background-position: left center, right center;
    height: 165px;
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const FCards = styled(BaseLayout)`
align-items: center;
display: flex;
font-size: 14px;
justify-content: space-between;
margin-bottom: 8px;
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="24px" color="secondary">
          {TranslateString(576, 'Ogee Finance')}
        </Heading>
        <Text>{TranslateString(578, 'The Best AMM and Yield Farm on Huobi ECO Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <TwitterCard />
        </Cards>
        <Cards>
          <OytStats />
          <TotalValueLockedCard />
        </Cards>
        <FCards>
          <Farms />
        </FCards>
      </div>
    </Page>
  )
}

export default Home
