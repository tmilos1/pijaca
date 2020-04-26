import React, { useEffect } from 'react'
import { Link } from "react-router-dom"

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useParams } from "react-router-dom"

import { FacebookProvider, Comments, Like } from 'react-facebook';

import { FB_ID } from './../../stores/apiConf'

import Carousel from '@brainhubeu/react-carousel'
import '@brainhubeu/react-carousel/lib/style.css'

import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import GrupaKarticaKolicinaRobe from '../../containers/GrupaKarticaKolicinaRobe'
import NaruciForma from '../../components/NaruciForma'

const useStyles = makeStyles((theme) => ({
    toolbarMargin: {
        padding: theme.spacing(4, 0, 4)
    },
    paperPadding: {
        padding: theme.spacing(3, 3, 3)
    }
}))

const Tezga = observer(() => {
    const classes = useStyles()
    let { tezgaId } = useParams()
    const { orderStore } = useAppContext()

    useEffect(() => {
        orderStore.fetchData(tezgaId)
    }, [orderStore, tezgaId])

    let naruciVisible = null

    if (orderStore.form.meta.isValid && orderStore.iznos > 0) {
        naruciVisible = true
    }

    const fbPageUrl = "https://napijaci.rs/tezga/" + orderStore.tezga.id

    return (
        <main>
            <div className={classes.toolbarMargin}>
                <Container >
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h3">
                            Tezga br. {orderStore.tezga.id}
                        </Typography>
                    </Paper>
                    <br />
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h6">
                            {orderStore.tezga.naziv}
                        </Typography>
                        <Typography variant="h6">
                            Telefon: {orderStore.tezga.telefon}
                        </Typography>
                        <Typography variant="h6">
                            Email: {orderStore.tezga.email}
                        </Typography>
                        <br />
                        <br />
                        <Typography variant="h6">
                            {orderStore.tezga.napomena.substr(0, 480)}
                        </Typography>
                        <br />
                        <br />
                        <FacebookProvider appId={FB_ID}>
                            <Like href={fbPageUrl} colorScheme="dark" showFaces share size="large" />
                        </FacebookProvider>
                    </Paper>
                    <br />
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h6">
                            Uslovi isporuke: {orderStore.textUsloviIsporuke}
                        </Typography>
                    </Paper>
                    <br />

                    <Carousel
                        slidesPerPage={3}
                        arrows
                        breakpoints={{
                            640: {
                                slidesPerPage: 1,
                            },
                            900: {
                                slidesPerPage: 2,
                            }
                        }}
                    >
                        {orderStore.tezga.slike.map(slika => (
                            <img key={slika.url} alt="random" height="300" src={slika.url} />
                        ))}
                    </Carousel>
                    <br />
                    <br />

                    <Paper className={classes.paperPadding}>
                    {orderStore.tezga.grupe.map(grupa => (
                    <Grid container spacing={3} key={grupa.kod}>
                        <Grid item xs={12} >
                                <Typography variant="h6">
                                    {grupa.naziv}
                                </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <GrupaKarticaKolicinaRobe kodGrupe={grupa.kod} />
                        </Grid>
                    </Grid>
                    ))}

                    <br />
                        <Typography variant="h6">
                            Ukupan iznos narudžbine: {orderStore.iznos} din.
                        </Typography>
                    </Paper>

                    <br />
                    <br />
                    <br />
                    <Paper className={classes.paperPadding}>
                        {orderStore.naruceno ?
                        (
                                <>
                                <Typography variant="h5" gutterBottom>
                                    Hvala na narudžbini!
                                </Typography>
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    component={Link} to={'/'}
                                >
                                    Početna strana
                                </Button>
                            </>
                        )
                            :
                        (
                            <>
                                <NaruciForma />
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={orderStore.handleNaruciClick}
                                    disabled={!naruciVisible}
                                >
                                    Naruči
                                </Button>
                            </>
                        )
                        }
                    </Paper>

                    <br />
                    <br />
                    <Paper className={classes.paperPadding} style={{textAlign: 'center'}}>
                        <FacebookProvider appId={FB_ID}>
                            <Comments href={fbPageUrl} width="100%"/>
                        </FacebookProvider>
                    </Paper>
            </Container>
            </div>
        </main>
    )
})

export default Tezga
