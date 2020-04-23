import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { DropzoneArea } from 'material-ui-dropzone'
import Typography from '@material-ui/core/Typography'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    naslovPostojeceSlike: {
        margin: "40px 0 10px",
    }
}))

const GalerijaSlika = observer(() => {
    const classes = useStyles()
    const { tezgaStore } = useAppContext()

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Dostavite nam slike za Vašu tezgu (do 10 slika)
            </Typography>
            <DropzoneArea onChange={tezgaStore.handleFilesChange} filesLimit={10}
                dropzoneText="Prevucite i spustite željene slike ili kliknite"
                getFileAddedMessage={(fileName) => `Uspešno ste dodali fajl ${fileName}.`}
            />

            {tezgaStore.form.postojece_slike.length > 0 &&
                <>
                    <div className={classes.naslovPostojeceSlike}>
                        <Typography variant="h6">
                            Postojeće slike:
                        </Typography>
                    </div>

                    <Grid container spacing={3}>
                        {tezgaStore.form.postojece_slike.filter(el => el.obrisana === false).map(slika => (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={slika.url}
                                        />
                                    </CardActionArea>
                                    <CardActions>
                                        <Button variant='outlined' size="small" color="secondary" onClick={ev => slika.obrisana = true}>
                                            Obriši
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </>
            }
        </>
    )
})

export default GalerijaSlika
