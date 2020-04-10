
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

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
})


const KarticaRobe = () => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://source.unsplash.com/random"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Banane
                    </Typography>

                    <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="u ponudi"
                    />
                </CardContent>
            </CardActionArea>
            <CardActions>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Cena po kg" />
                </form>
            </CardActions>
        </Card>
    )
}

export default KarticaRobe
