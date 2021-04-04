import React from 'react'
import styled from 'styled-components'
import { Heading, Text } from '@ogeefinance/uikit'
import Container from 'components/layout/Container'
import useI18n from 'hooks/useI18n'

const Title = styled(Heading).attrs({ as: 'h1', size: 'xl' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 24px;
`

const Blurb = styled(Text)`
  color: #ffffff;
  font-size: 20px;
  font-weight: 600;
`

const StyledHero = styled.div`
  background-image: linear-gradient(180deg, #5CDEC0 0%, #1ACAA1 100%);
  padding-bottom: 40px;
  padding-top: 40px;
  margin-bottom: 32px;
`
const Hero = () => {
  const TranslateString = useI18n()

  return (
    <StyledHero>
      <Container>
        <Title>{TranslateString(500, 'IDO: Initial DeFi Offerings')}</Title>
        <Blurb>{TranslateString(502, 'Buy new tokens with a new token sale model.')}</Blurb>
      </Container>
    </StyledHero>
  )
}

export default Hero
