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

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}
   
function getStandImage(cardNo) {
    const random = getRandomInt(4) + 1
    // const random = cardNo % 4 + 1
    return `images/tezga00${random}.png`
}

function Tezge() {
    const classes = useStyles()

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]


    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={3}>
                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={3}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={getStandImage(card)}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Slobodna tezga
                                </Typography> 
                                <Typography>
                                    Ovo je mesto za Vašu tezgu. Prijavite se besplatno!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button color="primary" component={Link} to={'/tezga/' + card}>
                                    Poseti
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Tezge