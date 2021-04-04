import React from 'react'
import styled from 'styled-components'
import { Text, Heading, BaseLayout, Button, LinkExternal, Flex, Image } from '@ogeefinance/uikit'
import { ifosConfig } from 'config/constants'
import useI18n from 'hooks/useI18n'
import IfoCard from './components/IfoCard'
import Title from './components/Title'
import IfoCards from './components/IfoCards'

const LaunchIfoCallout = styled(BaseLayout)`
  border-top: 2px solid ${({ theme }) => theme.colors.textSubtle};
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  margin: 0 auto;
  padding: 32px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: 1fr 1fr;
  }
`

const List = styled.ul`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 16px;

  & > li {
    line-height: 1.4;
    margin-bottom: 8px;
  }
`

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)

const Ifo = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <IfoCards isSingle>
        <IfoCard ifo={activeIfo} />
      </IfoCards>
      <LaunchIfoCallout>
        <div>
          <Title as="h2">{TranslateString(592, 'How to take part')}</Title>
          <Heading mb="16px">{TranslateString(594, 'Before Sale')}:</Heading>
          <List>
            <li>{TranslateString(596, 'Buy OGE and HT tokens')}</li>
            <li>{TranslateString(598, 'Get OGE-HT LP tokens by adding OGE and HT liquidity')}</li>
          </List>
          <Flex mb="16px">
            <LinkExternal href="https://ogeeswap.com/#/swap" mr="16px">
              {TranslateString(1060, 'Buy OGE')}
            </LinkExternal>
            <LinkExternal href="https://ogeeswap.com/#/add/0x81c3BB76508BB4668fD38DDA71655972F4a3526F/HT">
              {TranslateString(1062, 'Get LP tokens')}
            </LinkExternal>
          </Flex>
          <Heading mb="16px">{TranslateString(600, 'During Sale')}:</Heading>
          <List>
            <li>{TranslateString(602, 'While the sale is live, commit your OGE-LP [ OLP ] tokens to buy the IDO tokens')}</li>
          </List>
          <Heading mb="16px">{TranslateString(604, 'After Sale')}:</Heading>
          <List>
            <li>{TranslateString(606, 'Claim the tokens you bought, along with any unspent funds.')}</li>
            <li>{TranslateString(608, 'Done!')}</li>
          </List>
        </div>
        <div>
          <Image src="/images/ogee-shop.svg" alt="ifo bunny" width={436} height={406} responsive />
          <div>
            <Title as="h2">{TranslateString(512, 'Want to launch your own IDO?')}</Title>
            <Text mb={3}>
              {TranslateString(
                514,
                'Launch your project with OgeeSwap, Houbi Eco Chain most-used AMM project and liquidity provider, to bring your token directly to the most active and rapidly growing community on HECO.',
              )}
            </Text>
            <Button
              as="a"
              href="#comingsoon"
              external
            >
              {TranslateString(516, 'Apply to launch')}
            </Button>
          </div>
        </div>
      </LaunchIfoCallout>
    </div>
  )
}

export default Ifo
