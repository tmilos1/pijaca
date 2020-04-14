import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const NaruciForma = () => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
               Adresa za isporuku: 
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="naziv"
                        name="naziv"
                        label="Ime i prezime"
                        fullWidth
                        autoComplete="ime"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="adresa"
                        name="adresa"
                        label="Adresa"
                        autoComplete="adresa"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        required
                        id="telefon"
                        name="telefon"
                        label="Telefon"
                        fullWidth
                        autoComplete="telefon"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        fullWidth
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default NaruciForma

