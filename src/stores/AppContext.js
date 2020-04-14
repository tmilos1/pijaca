import React from 'react'
import makeInspectable from 'mobx-devtools-mst'
import HomeFilterStore from './HomeFilterStore'
import TezgaStore from './TezgaStore'

const appContext = React.createContext({
  homeFilterStore: makeInspectable(new HomeFilterStore()),
  tezgaStore: makeInspectable(new TezgaStore()),
})

export const useAppContext = () => React.useContext(appContext)
