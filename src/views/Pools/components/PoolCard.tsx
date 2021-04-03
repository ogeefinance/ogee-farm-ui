import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image } from '@ogeefinance/uikit'
import { useWeb3React } from '@web3-react/core'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { useERC20 } from 'hooks/useContract'
import { useOgeeApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useOgeeStake } from 'hooks/useStake'
import { useOgeeUnstake } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPoolApy } from 'utils/apy'
import { useOgeeHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { useGetApiPrice } from 'state/hooks'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldOgeeTitle from './OldOgeeTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'

interface HarvestProps {
  pool: Pool
}

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    ogeeId,
    tokenName,
    tokenAddress,
    stakingTokenName,
    stakingTokenAddress,
    stakingTokenDecimals,
    projectLink,
    harvest,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
  } = pool
  // Pools using native HT behave differently than pools using a token
  const isHtPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWeb3React()
  const { onApprove } = useOgeeApprove(stakingTokenContract, ogeeId)
  const { onStake } = useOgeeStake(ogeeId, isHtPool)
  const { onUnstake } = useOgeeUnstake(ogeeId)
  const { onReward } = useOgeeHarvest(ogeeId, isHtPool)

  // APY
  const rewardTokenPrice = useGetApiPrice(tokenName)
  const stakingTokenPrice = useGetApiPrice(stakingTokenName)
  const apy = getPoolApy(
    stakingTokenPrice,
    rewardTokenPrice,
    getBalanceNumber(pool.totalStaked, stakingTokenDecimals),
    parseFloat(pool.tokenPerBlock),
  )

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const isOldOgee = stakingTokenName === QuoteToken.OYT
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isHtPool
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
      stakingTokenDecimals={stakingTokenDecimals}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )
  const poolImage = `${pool.tokenName}-${pool.stakingTokenName}.svg`.toLocaleLowerCase()
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={stakingTokenName}
      stakingTokenDecimals={stakingTokenDecimals}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card isActive={isCardActive} isFinished={isFinished && ogeeId !== 0}>
      {isFinished && ogeeId !== 0 && <PoolFinishedSash />}
      <div style={{ padding: '24px' }}>
        <CardTitle isFinished={isFinished && ogeeId !== 0}>
          {isOldOgee && '[OLD]'} {tokenName} {TranslateString(348, 'Pool')}
        </CardTitle>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <Image src={`/images/pools/${poolImage}`} alt={tokenName} width={64} height={64} />
          </div>
          {account && harvest && !isOldOgee && (
            <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? 'Collecting' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          )}
        </div>
        {!isOldOgee ? (
          <BalanceAndCompound>
            <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
            {ogeeId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(704, 'Compound')}
                onClick={onPresentCompound}
              />
            )}
          </BalanceAndCompound>
        ) : (
          <OldOgeeTitle hasBalance={accountHasStakedBalance} />
        )}
        <Label isFinished={isFinished && ogeeId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
        <StyledCardActions>
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldOgee ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} onClick={handleApprove} width="100%">
                  {`Approve ${stakingTokenName}`}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldOgee
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0', stakingTokenDecimals)
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }
                >
                  {`Unstake ${stakingTokenName}`}
                </Button>
                <StyledActionSpacer />
                {!isOldOgee && (
                  <IconButton disabled={isFinished && ogeeId !== 0} onClick={onPresentDeposit}>
                    <AddIcon color="white" />
                  </IconButton>
                )}
              </>
            ))}
        </StyledCardActions>
        <StyledDetails>
          <div>{TranslateString(736, 'APR')}:</div>
          {isFinished || isOldOgee || !apy ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy} decimals={2} unit="%" />
          )}
        </StyledDetails>
        <StyledDetails>
          <div>{TranslateString(384, 'Your Stake')}:</div>
          <Balance
            fontSize="14px"
            isDisabled={isFinished}
            value={getBalanceNumber(stakedBalance, stakingTokenDecimals)}
          />
        </StyledDetails>
      </div>
      <CardFooter
        projectLink={projectLink}
        decimals={stakingTokenDecimals}
        totalStaked={totalStaked}
        startBlock={startBlock}
        endBlock={endBlock}
        isFinished={isFinished}
        poolCategory={poolCategory}
        tokenName={tokenName}
        tokenAddress={tokenAddress}
        tokenDecimals={tokenDecimals}
      />
    </Card>
  )
}

const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`

export default PoolCard
