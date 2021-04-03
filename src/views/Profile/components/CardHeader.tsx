import styled, { DefaultTheme } from 'styled-components'
import { CardHeader as UIKitCardHeader } from '@ogeefinance/uikit'

const getBackground = (theme: DefaultTheme) => {
  if (theme.isDark) {
    return 'linear-gradient(139.73deg, #293056 0%, #22253A 47.4%, #332642 100%)'
  }

  return 'linear-gradient(139.73deg, #CCEFFF 0%, #F6FDFF 46.87%, #E5E5FF 100%)'
}

const CardHeader = styled(UIKitCardHeader)`
  background: ${({ theme }) => getBackground(theme)};
  position: relative;
`

export default CardHeader
