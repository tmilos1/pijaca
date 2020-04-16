
import React from 'react'

import { Link } from "react-router-dom"

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Hidden from '@material-ui/core/Hidden'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    smallLogo: {
        width: "150px",
    }
}))

const Hero = () => {
    const classes = useStyles()

    return (
        <div className={classes.heroContent}>
            <Container maxWidth="lg">
                <Grid container >
                    <Hidden smDown>
                        <Grid item md={1}>
                            <img className={classes.smallLogo} src="images/tel.png" alt="Small logo" />
                        </Grid>
                    </Hidden>

                    <Grid item sm={12} md={11}>
                        <Container maxWidth="md">
                            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                                Besplatna registracija!
                            </Typography>
                            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                Ukoliko prodajete voće, povrće ili bilo šta na pijaci, ovde možete besplatno postaviti
                                Vašu internet tezgu. Jednostavno u 4 koraka.
                            </Typography>
                            <div className={classes.heroButtons}>
                                <Grid container spacing={2} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary" component={Link} to={'/prijava-tezge'}>
                                            Registruj se!
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </Container>

                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Hero
