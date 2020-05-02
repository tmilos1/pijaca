import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

import {
  Link as LinkRouter
} from "react-router-dom"

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}))

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://kodvel.co.rs/">
          Kodvel
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    )
  }

function Footer() {
    const classes = useStyles()

    return (
        <footer className={classes.footer}>
            <Typography variant="h6" color="textSecondary" align="center" gutterBottom>
                    Kupujte lokalno!
            </Typography>
            {/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Kontakt
            </Typography> */}
            <div style={{textAlign: 'center'}}>
              <LinkRouter style={{color: 'inherit', textDecoration: 'inhert'}} to="/terms">Uslovi</LinkRouter>
              &nbsp;
              <LinkRouter style={{color: 'inherit', textDecoration: 'inhert'}} to="/privacy">Privatnost</LinkRouter>
            </div>

            <Copyright />
        </footer>
    )
}

export default Footer
