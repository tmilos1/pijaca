import React from 'react'
import makeInspectable from 'mobx-devtools-mst'
import HomeFilterStore from './HomeFilterStore'
import TezgaAdresaStore from './TezgaAdresaStore'

const appContext = React.createContext({
  homeFilterStore: makeInspectable(new HomeFilterStore()),
  tezgaAdresaStore: makeInspectable(new TezgaAdresaStore()),
})

export const useAppContext = () => React.useContext(appContext)
