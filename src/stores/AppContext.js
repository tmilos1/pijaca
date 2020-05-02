import React from 'react'
import makeInspectable from 'mobx-devtools-mst'

import AppStore from './AppStore'
import AuthStore from './AuthStore'
import HomeFilterStore from './HomeFilterStore'
import TezgaStore from './TezgaStore'
import OrderStore from './OrderStore'
import KontaktStore from './KontaktStore'

export const tezgaStore = new TezgaStore()

const appStore = makeInspectable(new AppStore())
const homeFilterStore = makeInspectable(new HomeFilterStore(appStore))

const appContext = React.createContext({
  appStore,
  authStore: makeInspectable(new AuthStore()),
  homeFilterStore: homeFilterStore,
  tezgaStore: makeInspectable(tezgaStore),
  orderStore: makeInspectable(new OrderStore()),
  kontaktStore: makeInspectable(new KontaktStore()),
})

export const useAppContext = () => React.useContext(appContext)

