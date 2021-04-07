import React, { useState } from 'react'
import styled from 'styled-components'
import {
  Text,
  LinkExternal,
  Link,
  Box,
  CardFooter,
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@ogeefinance/uikit'
import useI18n from 'hooks/useI18n'
import { Ifo } from 'config/constants/types'
import { PublicIfoState } from '../../hooks/useGetPublicIfoData'

export interface IfoCardDetailsProps {
  ifo: Ifo
  publicIfoData: PublicIfoState
}

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({ ifo, publicIfoData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const { description, oytToBurn, projectSiteUrl, launchDate, launchTime, saleAmount, raiseAmount } = ifo
  const { raisingAmount, totalAmount } = publicIfoData
  const handleToggle = () => setIsOpen(!isOpen)

  return (
    <CardFooter>
      <Button
        variant="text"
        onClick={handleToggle}
        width="100%"
        endIcon={
          isOpen ? <ChevronUpIcon color="primary" width="24px" /> : <ChevronDownIcon color="primary" width="24px" />
        }
      >
        {isOpen ? TranslateString(1066, 'Hide') : TranslateString(658, 'Details')}
      </Button>
      {isOpen && (
        <>
          <Text as="p" color="textSubtle" my="24px">
            {description}
          </Text>
          <Box mb="24px">
            <Item>
              <Display>{TranslateString(582, 'Launch Time:')}</Display>
              <Text fontWeight="600">
                {launchDate},
                <Link
                  href="https://www.timeanddate.com/worldclock/timezone/utc"
                  target="blank"
                  rel="noopener noreferrer"
                  ml="4px"
                  style={{ display: 'inline' }}
                >
                  {launchTime}
                </Link>
              </Text>
            </Item>
            <Item>
              <Display>{TranslateString(584, 'For Sale:')}</Display>
              <Text fontWeight="600">{saleAmount}</Text>
            </Item>
            <Item>
              <Display>{TranslateString(999, 'To Raise (USD):')}</Display>
              <Text fontWeight="600">{raiseAmount}</Text>
            </Item>
            <Item>
              <Display>{TranslateString(586, 'OGE to Burn (USD):')}</Display>
              <Text fontWeight="600">{oytToBurn}</Text>
            </Item>
            <Item>
              <Display>{TranslateString(999, 'Total raised (% of target):')}</Display>
              <Text fontWeight="600">{`${totalAmount.div(raisingAmount).times(100).toFixed(2)}%`}</Text>
            </Item>
          </Box>
          <LinkExternal href={projectSiteUrl} style={{ margin: 'auto' }}>
            {TranslateString(412, 'View project site')}
          </LinkExternal>
        </>
      )}
    </CardFooter>
  )
}

export default IfoCardDetails
