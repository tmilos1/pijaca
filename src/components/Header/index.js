import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import EcoIcon from '@material-ui/icons/Eco';
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {
  Link,
} from "react-router-dom"

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
  },
  appTitle: {
    overflow: "hidden",
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
  authButtons: {
    position: 'absolute',
    right: '0',
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      right: 'inherit',
    }
  }
}))

const Header = observer(() => {
    const classes = useStyles()
    const { authStore, appStore } = useAppContext()

    if (window.location.host === process.env.REACT_APP_BASE_HOST && window.location.pathname === '/') {
        let kod_grada = localStorage.getItem('kod_grada')

        if (!kod_grada) {
          // show dialog with city selection list
          // or use default KS
          appStore.kod_grada = 'KS'
          appStore.grad = 'Kruševac'

          localStorage.setItem('kod_grada', appStore.kod_grada)
        }

        const site_url = '//' + appStore.kod_grada.toLowerCase() + '.' + process.env.REACT_APP_BASE_HOST
        window.location.href = site_url
    }

    return (
        <AppBar className={classes.appTitle} position="relative">
          <Container >
            <Toolbar>
              <Grid container>
                  <Grid item sm={12} md={3}>
                      <div className={classes.centerAppItems}>
                          <EcoIcon className={classes.icon} style={{alignSelf: "center"}}/>
                          <Link className={classes.homeLink} to="/">
                            <Typography variant="h6" color="inherit" noWrap>
                              Pijaca - {appStore.grad}
                            </Typography>
                          </Link>
                      </div>
                  </Grid>
                  <Grid item sm={12} md={7}>
                      <div className={classes.centerAppItems}>
                          <Link className={classes.homeLink} to="/">
                            <Typography variant="h6" className={classes.title}>
                              Početna
                            </Typography>
                          </Link>

                          {authStore.prijavljen && (
                          <Link className={classes.homeLink} to="/izmena-tezge">
                            <Typography variant="h6" className={classes.title}>
                              Izmena tezge
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
                  <Grid item sm={6} md={2}>
                      <div className={classes.centerAppItems}>

                          {authStore.prijavljen ? (
                              <Button className={classes.authButtons} >
                                <Link className={classes.homeLink} to="/odjava">
                                  Odjava
                                </Link>
                              </Button>
                          ) : (
                              <Button className={classes.authButtons} >
                                <Link className={classes.homeLink} to="/prijava">
                                  Prijava
                                </Link>
                              </Button>
                          )}

                      </div>
                  </Grid>

                </Grid> {/* container */}

            </Toolbar>
          </Container>
        </AppBar>
    )
})

export default Header
