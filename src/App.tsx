import React, { Suspense, useEffect, lazy } from 'react'
import { HashRouter, Route, Switch, Router  } from 'react-router-dom'
import { ResetCSS } from '@ogeefinance/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPriceList, useFetchPublicData } from 'state/hooks'
import useGetDocumentTitlePrice from './hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
// import GoogleAnalyticsReporter from './components/analytics/GoogleAnalyticsReporter'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
// import Pools from './views/Pools'
import GlobalCheckBullHiccupClaimStatus from './views/Collectibles/components/GlobalCheckBullHiccupClaimStatus'
import history from './routerHistory'
import Home from './views/Home'
import Pools from './views/Pools'
import Farms from './views/Farms'
import Ifos from './views/Ifos'
// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
// const Home = lazy(() => import('./views/Home'))
// const Farms = lazy(() => import('./views/Farms'))
// const Lottery = lazy(() => import('./views/Lottery'))
// const Ifos = lazy(() => import('./views/Ifos'))
 const NotFound = lazy(() => import('./views/NotFound'))
// const Collectibles = lazy(() => import('./views/Collectibles'))
// const Teams = lazy(() => import('./views/Teams'))
// const Team = lazy(() => import('./views/Teams/Team'))
// const Profile = lazy(() => import('./views/Profile'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()
  useFetchPublicData()
//  useFetchProfile()
  useFetchPriceList()
  useGetDocumentTitlePrice()

  return (
     <Suspense fallback={null}>
     <HashRouter>
      <Router history={history}>
      <ResetCSS />
      <GlobalStyle />
        <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />} />
          <Switch>
            <Route exact strict path="/" component={Home} />
            <Route exact strict path="/farms" component={Farms} />
            <Route exact strict path="/pools" component={Pools} />
            <Route exact strict path="/ido" component={Ifos} />
            <Route component={NotFound} />
          </Switch>
              </Menu>
              <EasterEgg iterations={2} />
              <ToastListener />
              <GlobalCheckBullHiccupClaimStatus />
          </Router>
         </HashRouter>
    </Suspense>
  )
}

export default React.memo(App)
