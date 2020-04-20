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
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import EcoIcon from '@material-ui/icons/Eco';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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
            </Toolbar>
          </Container>
        </AppBar>

        <Switch>

          <Route path="/tezga/:tezgaId">
            <Tezga />
          </Route>

          <Route path="/prijava-tezge">
            <Wizard />
          </Route>

          <Route path="/prijava">
            <Prijava />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>

      <Footer />
    </React.Fragment>
  );
}

export default App
