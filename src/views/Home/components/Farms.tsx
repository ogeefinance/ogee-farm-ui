import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text } from '@ogeefinance/uikit'
import styled from 'styled-components'
import { BLOCKS_PER_YEAR, OYT_PER_BLOCK, OYT_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceHtHusd, usePriceOytHusd, usePriceEthHusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { orderBy } from 'lodash'

import FarmCard, { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import Table from 'views/Farms/components/FarmTable/FarmTable'
import FarmTabButtons from 'views/Farms/components/FarmTabButtons'
import SearchInput from 'views/Farms/components/SearchInput'
import { RowProps } from 'views/Farms/components/FarmTable/Row'
import ToggleView from 'views/Farms/components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from 'views/Farms/components/types'
import Select, { OptionProps } from 'views/Farms/components/Select/Select'


export interface FarmsProps {
  tokenMode?: boolean
}

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Header = styled.div`
  padding: 32px 0px;
  background: ${({ theme }) => theme.colors.gradients.bubblegum};

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const oytPrice = usePriceOytHusd()
  const htPrice = usePriceHtHusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const ethPriceUsd = usePriceEthHusd()
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const { tokenMode } = farmsProps
  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (farms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(farms, 'apy', 'desc')
      case 'multiplier':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.multiplier.slice(0, -1)), 'desc')
      case 'earned':
        return orderBy(farms, (farm: FarmWithStakedValue) => (farm.userData ? farm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(farms, (farm: FarmWithStakedValue) => Number(farm.liquidity), 'desc')
      default:
        return farms
    }
  }

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay): FarmWithStakedValue[] => {
      const oytPriceVsHT = new BigNumber(farmsLP.find((farm) => farm.pid === OYT_POOL_PID)?.tokenPriceVsQuote || 0)
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
          if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const oytRewardPerBlock = new BigNumber(farm.oytPerBlock || 0.1)
          .times(new BigNumber(farm.poolWeight))
          .div(new BigNumber(10).pow(18))
        const oytRewardPerYear = oytRewardPerBlock.times(BLOCKS_PER_YEAR)

        // oytPriceInQuote * oytRewardPerYear / lpTotalInQuoteToken
      let apy = oytPrice.times(oytRewardPerYear)

        const totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0)




        if (farm.quoteTokenSymbol === QuoteToken.HUSD || farm.quoteTokenSymbol === QuoteToken.USDT) {
               apy = oytPriceVsHT.times(oytRewardPerYear).div(farm.lpTotalInQuoteToken).times(htPrice)
             } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
               apy = oytPrice.div(ethPriceUsd).times(oytRewardPerYear).div(farm.lpTotalInQuoteToken)
             } else if (farm.quoteTokenSymbol === QuoteToken.OYT) {
               apy = oytRewardPerYear.div(farm.lpTotalInQuoteToken)
             } else if (farm.dual) {
               const oytApy =
                 farm && oytPriceVsHT.times(oytRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm.lpTotalInQuoteToken)
               const dualApy =
                 farm.tokenPriceVsQuote &&
                 new BigNumber(farm.tokenPriceVsQuote)
                   .times(farm.dual.rewardPerBlock)
                   .times(BLOCKS_PER_YEAR)
                   .div(farm.lpTotalInQuoteToken)

               apy = oytApy && dualApy && oytApy.plus(dualApy)
             }

             let liquidity = farm.lpTotalInQuoteToken

             if (!farm.lpTotalInQuoteToken) {
               liquidity = null
             }
             if (farm.quoteTokenSymbol === QuoteToken.HT) {
               liquidity = htPrice.times(farm.lpTotalInQuoteToken)
             }
             if (farm.quoteTokenSymbol === QuoteToken.OYT) {
               liquidity = oytPrice.times(farm.lpTotalInQuoteToken)
             }

             if (farm.quoteTokenSymbol === QuoteToken.ETH) {
               liquidity = ethPriceUsd.times(farm.lpTotalInQuoteToken)
             }

             return { ...farm, apy, liquidity }
           })

           if (query) {
             const lowercaseQuery = query.toLowerCase()
             farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((farm: FarmWithStakedValue) => {
               if (farm.lpSymbol.toLowerCase().includes(lowercaseQuery)) {
                 return true
               }

               return false
             })
           }
           return farmsToDisplayWithAPY
         },
         [htPrice, farmsLP, query, oytPrice, ethPriceUsd],
       )

       const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
         setQuery(event.target.value)
       }


  const isActive = !pathname.includes('history')
   let farmsStaked = []
   if (isActive) {
     farmsStaked = stackedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
   } else {
     farmsStaked = farmsList(inactiveFarms)
   }

   farmsStaked = sortFarms(farmsStaked)

  const rowData = farmsStaked.map((farm) => {
    const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses } = farm
    const lpLabel = farm.lpSymbol && farm.lpSymbol.split(' ')[0].toUpperCase().replace('OGEEYIELD', '')

    const row: RowProps = {
      apr: {
        value:
          farm.apy &&
          farm.apy.times(new BigNumber(100)).toNumber().toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: farm.multiplier,
        lpLabel,
        quoteTokenAdresses,
        quoteTokenSymbol,
        tokenAddresses,
        oytPrice,
        originalValue: farm.apy,
      },
      farm: {
        image: farm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: farm.pid,
        depositFee: farm.depositFeeBP,
      },
      earned: {
        earnings: farm.userData ? getBalanceNumber(new BigNumber(farm.userData.earnings)) : null,
        pid: farm.pid,
      },
      liquidity: {
        liquidity: farm.liquidity,
      },
      multiplier: {
        multiplier: farm.multiplier,
      },
      details: farm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'farm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                htPrice={htPrice}
                oytPrice={oytPrice}
                ethPrice={ethPriceUsd}
                account={account}
                removed={false}
              />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((farm) => (
              <FarmCard
                key={farm.pid}
                farm={farm}
                htPrice={htPrice}
                oytPrice={oytPrice}
                ethPrice={ethPriceUsd}
                account={account}
                removed
              />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
              <Text> {TranslateString(1116, 'Staked only')}</Text>
            </ToggleWrapper>
          </ViewControls>
          <FilterContainer>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
      </Page>
    </>
  )
}

export default Farms
