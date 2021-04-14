import React from 'react'
import styled from 'styled-components'
import { HelpIcon } from '@ogeefinance/uikit'
import useI18n from 'hooks/useI18n'

import Tooltip from '../Tooltip/Tooltip'

export interface DepositFeeProps {
  depositFee?: number
}

const DepositFeeWrapper = styled.div`
  color: ${({ theme }) => theme.colors.text};
  width: 36px;
  text-align: right;

  ${({ theme }) => theme.mediaQueries.sm} {
    text-align: left;
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 14px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    svg {
      margin-left: 0;
    }
  }
`

const DepositFee: React.FunctionComponent<DepositFeeProps> = ({ depositFee }) => {
  const TranslateString = useI18n()

  return (
    <Container>
      <DepositFeeWrapper>{depositFee / 100}%</DepositFeeWrapper>
      <Tooltip
        content={
          <div>
            {TranslateString(999, 'The deposit fee represents the percentage of your total deposit amount that will be sent to ogee fund.')}
            <br />
            <br />
            {TranslateString(
              999,
              'For example, if deposit fee is 1% and you deposited 100 HUSD, 1 HUSD will be sent to ogee fund.',
            )}
          </div>
        }
      >
        <HelpIcon color="textSubtle" />
      </Tooltip>
    </Container>
  )
}

export default DepositFee
