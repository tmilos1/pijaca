import React from 'react'
import makeInspectable from 'mobx-devtools-mst'

import AppStore from './AppStore'
import HomeFilterStore from './HomeFilterStore'
import TezgaStore from './TezgaStore'

const appContext = React.createContext({
  appStore: makeInspectable(new AppStore()),
  homeFilterStore: makeInspectable(new HomeFilterStore()),
  tezgaStore: makeInspectable(new TezgaStore()),
})

export const useAppContext = () => React.useContext(appContext)
