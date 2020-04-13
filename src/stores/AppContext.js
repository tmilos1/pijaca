import React from 'react'
import HomeFilterStore from './HomeFilterStore'

const appContext = React.createContext({
  homeFilterStore: new HomeFilterStore(),
})

export const useAppContext = () => React.useContext(appContext)
