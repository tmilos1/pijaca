import React, { useEffect } from 'react'
import './App.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom"

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import EcoIcon from '@material-ui/icons/Eco';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import ReactGA from 'react-ga'
import { GA_ID } from './stores/apiConf'
import { observer } from "mobx-react"
import { useAppContext } from './stores/AppContext'
import withTracker from './withTracker'

import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Prijava from './pages/Prijava'
import Tezga from './pages/Tezga'
import Kontakt from './pages/Kontakt'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
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
  },
  centerAppItems: {
      display: "flex",
      alignItems: "center",
      height: "100%",
  },
}))

function Odjava() {
  const { authStore } = useAppContext()

  useEffect(() => {
    authStore.handleLogoutClick()
  }, [authStore])

  return <Redirect to="/" />
}

const App = observer(() => {
  const classes = useStyles()
  const { appStore } = useAppContext()
  const { authStore } = useAppContext()

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
              <Grid container>
                  <Grid item md={3}>
                      <div className={classes.centerAppItems}>
                          <EcoIcon className={classes.icon} style={{alignSelf: "center"}}/>
                          <Link className={classes.homeLink} to="/">
                            <Typography variant="h6" color="inherit" noWrap>
                              Pijaca - Kruševac
                            </Typography>
                          </Link>
                      </div>
                  </Grid>
                  <Grid item md={7}>
                      <div className={classes.centerAppItems}>
                          <Link className={classes.homeLink} to="/">
                            <Typography variant="h6" className={classes.title}>
                              Početna
                            </Typography>
                          </Link>
                          {authStore.prijavljen && (
                          <Link className={classes.homeLink} to="/izmena-tezge">
                            <Typography variant="h6" className={classes.title}>
                              Izmena podataka
                            </Typography>
                          </Link>
                          )}
                          <Link className={classes.homeLink} to="/kontakt">
                            <Typography variant="h6" className={classes.title}>
                              Kontakt
                            </Typography>
                          </Link>
                      </div>
                  </Grid>

                  <Grid item md={2}>
                      <div className={classes.centerAppItems}>

                          {authStore.prijavljen ? (
                              <Button style={{position: 'absolute', right: '0'}} color="inherit">
                                <Link className={classes.homeLink} to="/odjava">
                                  Odjava
                                </Link>
                              </Button>
                          ) : (
                              <Button style={{position: 'absolute', right: '0'}} color="inherit">
                                <Link className={classes.homeLink} to="/prijava">
                                  Prijava
                                </Link>
                              </Button>
                          )}
                      </div>
                  </Grid>
                </Grid>

            </Toolbar>
          </Container>
        </AppBar>

        <Switch>

          <Route path="/tezga/:tezgaId" component={withTracker(Tezga)} />
          <Route path="/prijava-tezge" component={withTracker(Wizard)} />
          <Route path="/izmena-tezge" component={withTracker(Wizard)} />
          <Route path="/prijava" component={withTracker(Prijava)} />
          <Route path="/odjava" component={withTracker(Odjava)} />
          <Route path="/kontakt" component={withTracker(Kontakt)} />
          <Route path="/privacy" component={withTracker(Privacy)} />
          <Route path="/terms" component={withTracker(Terms)} />
          <Route path="/" component={Home} />

        </Switch>
      </Router>

      <Footer />
    </React.Fragment>
  );
})

export default App
