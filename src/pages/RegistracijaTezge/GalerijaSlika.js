import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { DropzoneArea } from 'material-ui-dropzone'
import Typography from '@material-ui/core/Typography'

import { observer } from "mobx-react"
import { useAppContext } from '../../stores/AppContext'

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

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
    const [open, setOpen] = useState(false)
    const [slikaZaBrisanje, setSlikaZaBrisanje] = useState('')
    const classes = useStyles()
    const { tezgaStore } = useAppContext()

    const handleClickOpen = (slika) => {
      setOpen(true)
      setSlikaZaBrisanje(slika)
    }

    const handleSetObrisana = () => {
      slikaZaBrisanje.obrisana = true
      setOpen(false)
    }
  
    const handleClose = () => {
      setOpen(false)
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Dostavite nam slike za Vašu tezgu (do 10 slika)
            </Typography>
            <DropzoneArea onChange={tezgaStore.handleFilesChange} filesLimit={10}
                maxFileSize={10000000}
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
                            <Grid item xs={12} sm={6} md={4} key={slika.url}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={slika.url}
                                        />
                                    </CardActionArea>
                                    <CardActions style={{ justifyContent: 'space-between' }}>
                                        <Button variant='outlined' size="small" color="secondary" onClick={() => handleClickOpen(slika)}>
                                            Obriši
                                        </Button>
                                        <Button variant={slika.naslovna ? 'contained' : 'outlined'} size="small" color="primary" onClick={
                                            ev => {
                                                tezgaStore.form.postojece_slike.filter(el => el.obrisana === false).map(slikaReset =>
                                                    slikaReset.naslovna = false
                                                )
                                                slika.naslovna = true
                                            }
                                        }>
                                            Naslovna
                                        </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Da li želite da obrišete sliku?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleClose} color="primary">
                                                    Ne
                                                </Button>
                                                <Button onClick={handleSetObrisana} color="primary" autoFocus>
                                                    Da
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
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
