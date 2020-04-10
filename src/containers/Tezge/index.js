import React from 'react'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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
    },
    cardContent: {
        flexGrow: 1,
    },
}))


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
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Tezga 123
                                </Typography>
                                <Typography>
                                    Ovo je mesto za Vašu tezgu. Prijavite se besplatno!
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary">
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