import React from 'react'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link, useParams } from "react-router-dom"

import Carousel, { Dots } from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import { makeStyles } from '@material-ui/core/styles'

import GrupaKarticaRobe from '../../containers/GrupaKarticaRobe'
import NaruciForma from '../../components/NaruciForma'

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        padding: theme.spacing(4, 0, 4)
    },
    paperPadding: {
        padding: theme.spacing(3, 3, 3)
    }
}))

const Tezga = () => {
    const classes = useStyles()
    let { tezgaId } = useParams()

    return (
        <main>
            <div className={classes.toolbarMargin}>
                <Container >
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h3">
                            Tezga br. {tezgaId}
                        </Typography>
                    </Paper>
                    <br />
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h6">
                            Ime ili Naziv
                </Typography>
                        <Typography variant="h6">
                            Telefon:
                </Typography>
                        <Typography variant="h6">
                            Email:
                </Typography>
                    </Paper>
                    <br />
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h6">
                            Uslovi isporuke:
                        </Typography>
                    </Paper>
                    <br />

                    <Carousel
                        slidesPerPage={3}
                        arrows
                        breakpoints={{
                            640: {
                                slidesPerPage: 1,
                                arrows: false
                            },
                            900: {
                                slidesPerPage: 2,
                                arrows: false
                            }
                        }}
                    >
                        <img width="400" height="300" src="https://source.unsplash.com/random" />
                        <img width="400" height="300" src="https://source.unsplash.com/random" />
                        <img width="400" height="300" src="https://source.unsplash.com/random" />
                        <img width="400" height="300" src="https://source.unsplash.com/random" />
                        <img width="400" height="300" src="https://source.unsplash.com/random" />
                        <img width="400" height="300" src="https://source.unsplash.com/random" />
                    </Carousel>

                    <br />
                    <br />
                    <Paper className={classes.paperPadding}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                                <Typography variant="h6">
                                    Povrće
                                </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GrupaKarticaRobe />
                        </Grid>
                    </Grid>

                    <br />
                    <br />
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                                <Typography variant="h6">
                                    Voće
                                </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GrupaKarticaRobe />
                        </Grid>
                    </Grid>

                    <br />
                        <Typography variant="h6">
                            Ukupan iznos porudžbine: 1200,00 din.
                        </Typography>
                    </Paper>
                    <br />
                    <br />
                    <br />
                    <Paper className={classes.paperPadding}>
                        <NaruciForma />
            
                        <br />
                        <br />
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                        >
                            Naruči
                        </Button>
                    </Paper>
            </Container>
            </div>
        </main>
    )
}

export default Tezga
