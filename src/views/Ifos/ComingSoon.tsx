// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { Button, Text } from '@ogeefinance/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import Container from 'components/layout/Container'
import Hero from './components/Hero'
import Title from './components/Title'

const Content = styled(Container)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;

  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: 1fr minmax(auto, 436px);
  }
`

const Block = styled.div`
  margin-bottom: 32px;
`

const MainImage = styled.img`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: block;
  }
`

const MobileImage = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 136px;
  padding: 16px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LiquidityLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
`

const ComingSoon = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Hero />
      <Content>
        <div>
          <Block>
            <Title as="h2">{TranslateString(999, 'Coming Soon to Ogeeswap.')}</Title>
            <Text mb={3}>
              {TranslateString(
                504,
                'You’ll pay for the new tokens using OGE-HT LP tokens, which means you need to stake equal amounts of OGE and HT in a liquidity pool to take part.',
              )}
            </Text>
            <Text mb={3}>
              <LiquidityLink href="https://ogeeswap.com/#/add/0x81c3BB76508BB4668fD38DDA71655972F4a3526F/HT">
                {TranslateString(506, 'Get OGE-HT LP >')}
              </LiquidityLink>
            </Text>
            <Text mb={3}>
              {TranslateString(508, 'The project gets the HT, Ogeeswap will burn 50% of OGE token.')}
              <br />
              <strong>{TranslateString(510, 'You get the tokens.')}</strong>
            </Text>
          </Block>
          <MobileImage src="/images/ogee-shop.svg" alt="ifo bunny" />
          <Block>
            <Title as="h2">{TranslateString(512, 'Want to launch your own IDO?')}</Title>
            <Text mb={3}>
              {TranslateString(
                514,
                'Launch your project with OgeeSwap, Houbi Eco Chain most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on HECO.',
              )}
            </Text>
            <Button
              as="a"
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              {TranslateString(516, 'Apply to launch')}
            </Button>
          </Block>
        </div>
        <div>
          <MainImage src="/images/ogee-shop.svg" alt="ifo bunny" />
        </div>
      </Content>
    </Page>
  )
}

export default ComingSoon
