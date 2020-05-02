
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import TextField from '@material-ui/core/TextField'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    title: {
        minHeight: 80,
    },
    neizabranProizvod: {
        backgroundColor: "white"
    },
    izabranProizvod: {
        backgroundColor: "#fff6e5"
    },
})


const KarticaKolicinaRobe = observer((props) => {
    const classes = useStyles()

    const { orderStore } = useAppContext()

    return (
        <Card className={classes.root}>
        <CardActionArea className={props.proizvod.kolicina > 0 ? classes.izabranProizvod : classes.neizabranProizvod}>
                <CardMedia
                    className={classes.media}
                    image={props.proizvod.slika_proizvoda}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                        {props.proizvod.naziv}
                    </Typography>

                    <Typography gutterBottom variant="h6">
                        Cena: {props.proizvod.cena} Din
                    </Typography>
                    ({props.proizvod.opis_cene})
                </CardContent>
            </CardActionArea>
            <CardActions className={props.proizvod.kolicina > 0 ? classes.izabranProizvod : classes.neizabranProizvod}>
                <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    id="standard-basic"
                    label="Količina"
                    name={props.proizvod.kod_proizvoda}
                    type="number"
                    inputProps={{ min: "0", step: "0.1" }}

                    value={props.proizvod.kolicina}
                    onChange={orderStore.handleProizvodKolicinaChange}
                    onKeyPress={orderStore.onKeyPress}
                    onFocus={orderStore.onFocus}
                />
                </form>
            </CardActions>
        </Card>
    )
})

export default KarticaKolicinaRobe
