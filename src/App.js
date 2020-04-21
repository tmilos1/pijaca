import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom"

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import EcoIcon from '@material-ui/icons/Eco';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import ReactGA from 'react-ga'
import { GA_ID } from './stores/apiConf'
import { useAppContext } from './stores/AppContext'
import withTracker from './withTracker'

import Home from './pages/Home'
import Prijava from './pages/Prijava'
import Tezga from './pages/Tezga'
import Wizard from './pages/RegistracijaTezge/Wizard'
import Footer from './components/Footer'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  appTitle: {
  },
  homeLink: {
    textDecoration: 'none',
    color: 'white',
    marginRight: '50px',
  }
}))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  const classes = useStyles()
  const { appStore } = useAppContext()

  useEffect(() => {
    ReactGA.initialize(GA_ID)

    if(!appStore.initialLoadProp) {
      ReactGA.pageview(window.location.pathname);  
      appStore.initialLoadProp = true
    }
  }, [appStore])

  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
        <ScrollToTop />

        <AppBar className={classes.appTitle} position="relative">
          <Container >
            <Toolbar>
              <EcoIcon className={classes.icon} />
              <Link className={classes.homeLink} to="/">
                <Typography variant="h6" color="inherit" noWrap>
                  Pijaca - Kruševac
                </Typography>
              </Link>
              <Link className={classes.homeLink} to="/">
                <Typography variant="h6" className={classes.title}>
                  Početna
                </Typography>
              </Link>

              {/* <Button style={{position: 'absolute', right: '0'}} color="inherit">
                <Link className={classes.homeLink} to="/prijava">
                  Prijava
                </Link>
              </Button> */}

            </Toolbar>
          </Container>
        </AppBar>

        <Switch>

          <Route path="/tezga/:tezgaId" component={withTracker(Tezga)} />

          <Route path="/prijava-tezge" component={withTracker(Wizard)} />

          <Route path="/prijava" component={withTracker(Prijava)} />

          <Route path="/" component={withTracker(Home)} />

        </Switch>
      </Router>

      <Footer />
    </React.Fragment>
  );
}

export default App
