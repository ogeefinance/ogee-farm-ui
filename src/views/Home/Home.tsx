import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@ogeefinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import OytStats from 'views/Home/components/OytStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
// import EarnAPYCard from 'views/Home/components/EarnAPYCard'
// import EarnAssetCard from 'views/Home/components/EarnAssetCard'
import Farms from 'views/Home/components/Farms'
// import TwitterCard from 'views/Home/components/TwitterCard'
// import BurnedStats from 'views/Home/components/BurnedStats'


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
const Hero2 = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 8px;
  padding-top: 32px;
  text-align: center;
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

const CTACards = styled(BaseLayout)`
  align-items: start;
  margin-bottom: 32px;
  & > div {
    grid-column: span 6;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 4;
    }
  }
`
/*
const FCard = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 32px;
  `
*/

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (

    <Page>
      <Hero>
        <Heading as="h1" size="xl" mb="26px" color="secondary">
          {TranslateString(576, 'Ogee Finance')}
        </Heading>
        <Text>{TranslateString(578, 'The Best AMM and Yield Farm on Huobi ECO Chain.')}</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <OytStats />
        </Cards>
        <CTACards>
          <TotalValueLockedCard />
        </CTACards>
      <div>
      <Hero2>
        <Heading as="h1" size="xl" color="secondary">
          {TranslateString(578, 'Most Profitable Farming Pools')}
        </Heading>
      </Hero2>
         <Farms />
      </div>
      </div>


      </Page>
    )
}

export default Home
