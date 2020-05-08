import React, { useEffect } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import CssBaseline from '@material-ui/core/CssBaseline'

import ReactGA from 'react-ga'
import { GA_ID } from './stores/apiConf'
import { observer } from "mobx-react"
import { useAppContext } from './stores/AppContext'
import withTracker from './withTracker'

import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Prijava from './pages/Prijava'
import PromenaSifre from './pages/Prijava/PromenaSifre'
import ResetLozinke from './pages/Prijava/ResetLozinke'
import Order from './pages/Order'
import Kontakt from './pages/Kontakt'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Wizard from './pages/RegistracijaTezge/Wizard'
import Header from './components/Header'
import Footer from './components/Footer'

function Odjava() {
  const { authStore } = useAppContext()

  useEffect(() => {
    authStore.handleLogoutClick()
  }, [authStore])

  return <Redirect to="/" />
}

const App = observer(() => {
  const { appStore } = useAppContext()
  const { authStore } = useAppContext()

  useEffect(() => {
    ReactGA.initialize(GA_ID)

    if(!appStore.initial_load) {
      ReactGA.pageview(window.location.pathname);  
      appStore.initial_load = true
    }
  }, [appStore])

  let redirectToHome = null
  if (authStore.redirectToHome) {
    redirectToHome = <Redirect to="/" />
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Router>
        {redirectToHome}
        <ScrollToTop />

        <Header />

        <Switch>
          <Route path="/tezga/:displayId" component={withTracker(Order)} />
          <Route path="/prijava-tezge" component={withTracker(Wizard)} />
          <Route path="/izmena-tezge" component={withTracker(Wizard)} />
          <Route path="/prijava" component={withTracker(Prijava)} />
          <Route path="/promeni-lozinku/:token" component={withTracker(PromenaSifre)} />
          <Route path="/reset-lozinke" component={withTracker(ResetLozinke)} />
          <Route path="/odjava" component={withTracker(Odjava)} />
          <Route path="/kontakt" component={withTracker(Kontakt)} />
          <Route path="/privacy" component={withTracker(Privacy)} />
          <Route path="/terms" component={withTracker(Terms)} />
          <Route path="/" component={Home} />
        </Switch>

        <Footer />
      </Router>

    </React.Fragment>
  );
})

export default App
