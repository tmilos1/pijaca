
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

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
        backgroundColor: "#e5fbe5"
    },
})


const KarticaCenaRobe = observer((props) => {
    const classes = useStyles()

    const { tezgaStore } = useAppContext()

    return (
        <Card className={classes.root}>
            <CardActionArea className={props.proizvod.izabran ? classes.izabranProizvod : classes.neizabranProizvod}>
                <CardMedia
                    className={classes.media}
                    image={props.proizvod.slika_proizvoda}
                />
                <CardContent >
                    <Typography gutterBottom variant="h6" component="h2" className={classes.title}>
                        {props.proizvod.naziv}
                    </Typography>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.proizvod.izabran}
                                onChange={tezgaStore.handleProizvodChange}
                                name={props.proizvod.kod}
                                color="primary"
                            />
                        }
                        label="U ponudi"
                    />
                </CardContent>
            </CardActionArea>
            <CardActions className={props.proizvod.izabran ? classes.izabranProizvod : classes.neizabranProizvod}>
                {props.proizvod.izabran && (
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="standard-basic" 
                        name={props.proizvod.kod}
                        label={props.proizvod.opis_cene}
                        type="number"
                        inputProps={{ min: "0" }}

                        value={props.proizvod.cena}
                        onChange={tezgaStore.handleProizvodCenaChange}
                        onKeyPress={tezgaStore.onKeyPress}
                        onFocus={tezgaStore.onFocus}
                    />
                    <br />
                    <br />
                    <TextField
                        id="napomena"
                        name={props.proizvod.kod}
                        label="Napomena"
                        autoComplete="napomena"
                        multiline
                        fullWidth

                        value={props.proizvod.napomena.value}
                        error={props.proizvod.napomena.touched && props.proizvod.napomena.invalid}
                        helperText={props.proizvod.napomena.error}
                        onChange={tezgaStore.handleProizvodNapomenaChange}
                        onKeyPress={tezgaStore.onKeyPress}
                        onFocus={tezgaStore.onFocus}
                    />
                </form>
                )}
            </CardActions>
        </Card>
    )
})

export default KarticaCenaRobe
