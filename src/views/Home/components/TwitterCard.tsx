import React from 'react'
import { Card, CardBody, Heading } from '@ogeefinance/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Timeline } from 'react-twitter-widgets'

const StyledTwitterCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const TwitterCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledTwitterCard>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(10003, 'Announcements')}
        </Heading>
        <Timeline
          dataSource={{
            sourceType: 'profile',
            screenName: 'ogee_finance',
          }}
          options={{
            height: '300',
            chrome: 'noheader, nofooter',
            width: '500',
          }}
        />
      </CardBody>
    </StyledTwitterCard>
  )
}

export default TwitterCard
