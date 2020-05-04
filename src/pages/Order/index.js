import React, { useEffect } from 'react'
import { Link } from "react-router-dom"

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useParams } from "react-router-dom"

import { FacebookProvider, Comments, Like } from 'react-facebook';

import { FB_ID } from '../../stores/apiConf'

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
        padding: theme.spacing(3, 3, 3),
        overflow: "hidden",
    }
}))

const Order = observer(() => {
    const classes = useStyles()
    let { displayId } = useParams()
    const { orderStore, appStore } = useAppContext()

    useEffect(() => {
        orderStore.fetchData(appStore.kod_grada, displayId)
    }, [orderStore, displayId, appStore.kod_grada])

    let naruciVisible = null

    if (orderStore.form.meta.isValid && orderStore.iznos > 0) {
        naruciVisible = true
    }

    const fbPageUrl = appStore.site_url + '/tezga/' + orderStore.tezga.display_id

    return (
        <main>
            <div className={classes.toolbarMargin}>
                <Container >
                    <Paper className={classes.paperPadding}>
                        <Typography variant="h3">
                            Tezga br. {orderStore.tezga.display_id}
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

                    {/* <Carousel
                        slidesPerPage={3}
                        arrows
                        offset={430}
                        clickToChange
                        breakpoints={{
                            640: {
                                slidesPerPage: 1,
                                arrows: false,
                                infinite: true,
                                clickToChange: false,
                                centered: true,
                                offset: 0,
                                slidesPerScroll: 1,
                            },
                            900: {
                                slidesPerPage: 2,
                                clickToChange: false,
                                animationSpeed: 2000,
                                infinite: true,
                                centered: true,
                                offset: 0,
                                slidesPerScroll: 1,
                            }
                        }}
                    > */}
                    <Carousel
                        slidesPerPage={3}
                        arrows
                        breakpoints={{
                            640: {
                                slidesPerPage: 1,
                                arrows: false,
                                minDraggableOffset: 1,
                                animationSpeed: 200,
                            },
                            900: {
                                slidesPerPage: 2,
                                arrows: false,
                                minDraggableOffset: 1,
                                animationSpeed: 200,
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
                            Ukupan iznos narudžbine: {orderStore.iznos.toFixed(2)} din.
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
                                        Hvala na narudžbini! Ukoliko ste uneli email, narudžbenica će Vam tamo stići.<br />
                                        Proverite i spam (neželjenu poštu).
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
                    <Paper className={classes.paperPadding} style={{ textAlign: 'center' }}>
                        <FacebookProvider appId={FB_ID}>
                            <Comments href={fbPageUrl} width="100%" />
                        </FacebookProvider>
                    </Paper>
                </Container>
            </div>
        </main>
    )
})

export default Order
