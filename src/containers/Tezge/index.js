import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
        // paddingTop: '100%', // 16:9
        // marginBottom: '20%', // 16:9
        marginTop: '10px',
        height: "100px",
        backgroundSize: "contain",
    },
    cardContent: {
        flexGrow: 1,
    },
}))
   
const Tezge = observer(() => {
    const classes = useStyles()
    const { homeFilterStore } = useAppContext()

    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={3}>
                {homeFilterStore.tezge.map((tezga) => (
                    <Grid item key={tezga.id} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={tezga.slika}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {tezga.naziv}
                                </Typography> 
                                <Typography>
                                    {tezga.napomena}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button color="primary" component={Link} to={'/tezga/' + tezga.id}>
                                    Poseti
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
})

export default Tezge
