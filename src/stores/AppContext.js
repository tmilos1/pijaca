import React from 'react'
import makeInspectable from 'mobx-devtools-mst'

import AppStore from './AppStore'
import AuthStore from './AuthStore'
import HomeFilterStore from './HomeFilterStore'
import TezgaStore from './TezgaStore'
import OrderStore from './OrderStore'

const appContext = React.createContext({
  appStore: makeInspectable(new AppStore()),
  authStore: makeInspectable(new AuthStore()),
  homeFilterStore: makeInspectable(new HomeFilterStore()),
  tezgaStore: makeInspectable(new TezgaStore()),
  orderStore: makeInspectable(new OrderStore()),
})

export const useAppContext = () => React.useContext(appContext)
