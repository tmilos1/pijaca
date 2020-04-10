
import React from 'react'

import { Link } from "react-router-dom"

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
}))

const Hero = () => {
    const classes = useStyles()

    return (
        <div className={classes.heroContent}>
            <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Besplatna prijava!
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                    Ukoliko prodajete voće, povrće ili bilo šta na pijaci, ovde možete besplatno postaviti,
                    Vašu digitalnu tezgu.
                </Typography>
                <div className={classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            <Button variant="contained" color="primary" component={Link} to={'/prijava-tezge'}>
                                Prijava tezge!
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default Hero
